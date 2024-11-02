# -*- coding: utf-8 -*-

from odoo import http
from odoo.http import request
import uuid
import json
import requests
class MagentoUserAPI(http.Controller):

    @http.route('/magento/create_user', type='json', auth='public', methods=['POST'], csrf=False)
    def create_user(self, **kwargs):
        try:
            session_params = {
                "db": kwargs.get('database'),
                "login": kwargs.get('admin_login'),
                "password": kwargs.get('admin_password')
            }
            session_url = kwargs.get('session_url')
            self.session_authenticate(session_url=session_url, params=session_params)

            # Extract data from the request
            name = kwargs.get('user_name')
            email = kwargs.get('user_email')
            course_id = kwargs.get('course_id')
            # Validate if all required fields are present
            if not name or not email or not course_id:
                return {'error': 'Missing required fields','success':False}

            # Check if a user with the same email and same course assigned already exists
            existing_user = request.env['res.users'].sudo().search([('login', '=', email)], limit=1)
            if existing_user:
                # Enroll the user in the course (slide.channel.partner model)
                user_course = request.env['slide.channel.partner'].sudo().search([
                    ('channel_id','=', course_id),
                    ('partner_id','=', existing_user.partner_id.id)
                ])
                if user_course:
                    return {'error': 'User already enrolled in the course', 'success': False}
                else:
                    return self.assign_course(request, user=existing_user, course_id=course_id, already_user_exist=True)
            else:
                # Generate a UUID
                generated_uuid = uuid.uuid4()
                # Convert to an integer and take the first 12 digits
                password = str(generated_uuid.int)[:12]

                values = {
                    'name': name,
                    'login': email,
                    'email': email,
                    'password': password,
                }
                # Create a new user
                request.env['res.users'].sudo().signup(values, '')
                request.env.cr.commit()
                user = request.env['res.users'].sudo().search([('login', '=', email)], limit=1)
                if user:
                    return self.assign_course(request, user=user, course_id=course_id, already_user_exist=False)
        except Exception as e:
            return {'success': False, 'error': str(e)}

    # @http.route('/magento/assign_course', type='json', auth="user", methods=['POST'], csrf=False)
    def assign_course(self, request, user, course_id, already_user_exist=False):
        try:
            # Get the course (slide.channel model) by ID
            course = request.env['slide.channel'].sudo().search([('id', '=', course_id)], limit=1)
            if not course:
                return {"error": "Course not found", "success": False}

            # Enroll the user in the course (slide.channel.partner model)
            enrollment = request.env['slide.channel.partner'].sudo().create({
                'channel_id': course.id,
                'partner_id': user.partner_id.id
            })

            if not already_user_exist:
                # Generate a UUID
                generated_uuid = uuid.uuid4()
                # Convert to an integer and take the first 12 digits
                password = str(generated_uuid.int)[:12]

                try:
                    email_sent = self.send_course_assignment_email(request, user.partner_id, course, password, already_user_exist=False)
                    user.write({'password': password})
                except Exception as e:
                    email_sent = f"Email not Send due to {str(e)}"
            else:
                try:
                    email_sent = self.send_course_assignment_email(request, user.partner_id, course, password=False, already_user_exist=True)
                except Exception as e:
                    email_sent = f"Email not Send due to {str(e)}"

            return {
                "message": "User successfully enrolled in the course",
                "course_id": course.id,
                "user_id": user.id,
                "enrollment_id": enrollment.id,
                "email_sent": email_sent,
                "success": True
            }
        except Exception as e:
            return {"error": str(e), "success": False}

    def get_odoo_base_url(self):
        """Get the base URL of the current Odoo instance."""
        return request.env['ir.config_parameter'].sudo().get_param('web.base.url')    

    def send_course_assignment_email(self,request, partner, course, password, already_user_exist=False):
        """Send custom email notification when a course is assigned to a user."""

        if not already_user_exist:
            base_url = self.get_odoo_base_url()
            # Set up email values
            email_values = {
                'subject': f"Green Edtech: {course.name}",
                'email_to': partner.email,
                'body_html': f"""
                    <p>Dear {partner.name},</p>
                    <p>You have been successfully assigned to the course <strong>{course.name}</strong>.</p>
                    <p>You can start the course by clicking <a href="{base_url}/web/login">here</a>.</p>
                    <p>This is your login credentials Email:{partner.email} and Password: {password}</a>.</p>
                    <p>Best regards,<br>Your Team</p>
                """,
                'email_from': 'your_email@yourdomain.com',  # Replace with your sender's email
            }
        else:
            email_values = {
                'subject': f"Green Edtech: {course.name}",
                'email_to': partner.email,
                'body_html': f"""
                                <p>Dear {partner.name},</p>
                                <p>You have been successfully assigned to the course <strong>{course.name}</strong>.</p>
                                <p>You can start the course by clicking <a href="{base_url}/web/login">here</a>.</p>
                                <p>Best regards,<br>Your Team</p>
                            """,
                'email_from': 'your_email@yourdomain.com',  # Replace with your sender's email
            }
        print("check email data: ",email_values)

        # Create a mail.mail record and send the email
        mail = request.env['mail.mail'].create(email_values)
        mail.send()
        return "Email Sent Successfully"

    def session_authenticate(self, session_url, params):
        # self.url_open('/web/session/logout')
        try:
            payload = {
                "jsonrpc": "2.0",
                "method": "call",
                "id": 0,
                "params": params
            }
            # Make a request to the session API
            session_response = requests.post(session_url, json=payload)

            # Check if session was created successfully
            if session_response.status_code == 200:
                session_data = session_response.json()

                if session_data.get('result'):
                    return session_data['result']
        except Exception as e:
            raise Exception(f"Error authenticating session: {str(e)}")

        # self.url_open('/web/session/logout')
        try:
            payload = {
                "jsonrpc": "2.0",
                "method": "call",
                "id": 0,
                "params": params
            }
            # Make a request to the session API
            session_response = requests.post(session_url, json=payload)

            # Check if session was created successfully
            if session_response.status_code == 200:
                session_data = session_response.json()

                if session_data.get('result'):
                    return session_data['result']
        except Exception as e:
            raise Exception(f"Error authenticating session: {str(e)}")
