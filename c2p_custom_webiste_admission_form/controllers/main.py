from odoo import http
from odoo.http import request
import json
from datetime import datetime


class WebsiteAdmissionForm(http.Controller):
    @http.route('/admission/form', type='http', auth="public", website=True)
    def admission_form(self, **kw):
        res_partner_title = request.env['res.partner.title'].sudo().search([])
        res_partner_country = request.env['res.country'].sudo().search([])
        res_partner_state = request.env['res.country.state'].sudo().search([])
        op_courses = request.env['op.course'].sudo().search([])
        # op_branchs = request.env['res.company'].sudo().search([])
        op_admission_register = request.env['op.admission.register'].sudo().search([])
        return request.render('c2p_custom_webiste_admission_form.admission_form', {'res_partner_title': res_partner_title, 'res_partner_country': res_partner_country, 'res_partner_state': res_partner_state, 'op_courses': op_courses, 'op_admission_register': op_admission_register})

    @http.route('/api/state_country', type='http', auth="public", methods=['GET'], website=True, sitemap=True)
    def get_state_country(self, **kw):
        country_id = kw.get('country_id')
        res_partner_states = request.env['res.country.state'].sudo().search([('country_id', '=', int(country_id))])
        state_list = [{'id': state.id, 'name': state.name} for state in res_partner_states]
        return json.dumps(state_list)

    @http.route('/api/register_branch', type='http', auth="public", methods=['GET'], website=True, sitemap=True)
    def get_register_branch(self, **kw):
        # branch_id = kw.get('branch_id')
        op_admission_register = request.env['op.admission.register'].sudo().search([('branch_id', '=', int(branch_id))])
        admission_register_list = [{'id': admission_register.id, 'name': admission_register.name, 'start_date': admission_register.start_date.strftime("%Y-%m-%d") if admission_register.start_date else None, 'end_date': admission_register.end_date.strftime("%Y-%m-%d") if admission_register.end_date else None, 'max_count': admission_register.max_count, 'minimum_age_criteria': admission_register.minimum_age_criteria, 'course_id': admission_register.course_id.id} for admission_register in op_admission_register]
        return json.dumps(admission_register_list)

    @http.route('/api/course_register', type='http', auth="public", methods=['GET'], website=True, sitemap=True)
    def get_course_register(self, **kw):
        course_id = kw.get('course_id')
        register_id = kw.get('register_id')
        op_admission_register = request.env['op.admission'].sudo().search([('register_id', '=', int(register_id))])
        op_course = request.env['op.course'].sudo().search([('id', '=', int(course_id))])
        course_list = [{'id': course.id, 'name': course.name, 'check_max_count': len(op_admission_register)} for course in op_course]
        return json.dumps(course_list)

    @http.route('/admission/form/submit', type='http', auth="public", website=True)
    def admission_form_submit(self, **kw):
        first_name = kw.get('first_name')
        middle_name = kw.get('middle_name')
        last_name = kw.get('last_name')
        current_time = datetime.now()
        formatted_time = current_time.strftime("%Y-%m-%d %H:%M:%S")
        op_admission = request.env['op.admission'].sudo().create({
            'name': f'{first_name} {middle_name} {last_name}',
            'title': kw.get('title'),
            'first_name': kw.get('first_name'),
            'middle_name': kw.get('middle_name'),
            'last_name': kw.get('last_name'),
            'gender': kw.get('gender'),
            'birth_date': kw.get('birth_date'),
            'email': kw.get('email'),
            'country_id': kw.get('country_id'),
            'state_id': kw.get('state_id'),
            'city': kw.get('city'),
            'zip': kw.get('zip'),
            'phone': kw.get('mobile'),
            'mobile': kw.get('mobile'),
            'street': kw.get('street'),
            'street2': kw.get('street2'),
            # 'prev_institute_id': kw.get('prev_institute_id'),
            # 'prev_course_id': kw.get('prev_course_id'),
            # 'prev_result': kw.get('prev_result'),
            'application_date': formatted_time,
            'admission_date': formatted_time,
            # 'branch_id': kw.get('branch_id'),
            'register_id': kw.get('register_id'),
            'course_id': kw.get('course_id'),
            'father_name': kw.get('father_name'),
            'mother_name': kw.get('mother_name'),

        })
        # if op_admission:
        #     academic_history_list = json.loads(kw.get('academic_history_array'))
        #     for item in academic_history_list:
        #         if len(item) != 0:
        #             request.env['op.academic.history'].sudo().create({
        #                 'institute_name': item['institute_name'],
        #                 'course_name': item['course_name'],
        #                 'year_of_completion': item['year_of_completion'],
        #                 'result': item['result'],
        #                 'op_admission_id': op_admission.id
        #             })
        #     op_admission.submit_form()
        return request.redirect('/admission/form/view/?admission_id='+ str(op_admission.id))


    @http.route('/admission/form/view', type='http', auth="public", website=True)
    def admission_form_view(self, admission_id, **kw):
        op_admission = request.env['op.admission'].sudo().search([('id', '=', int(admission_id))])
        title = request.env['res.partner.title'].sudo().search([('id', '=', int(op_admission.title))])
        country = request.env['res.country'].sudo().search([('id', '=', int(op_admission.country_id.id))])
        state = request.env['res.country.state'].sudo().search([('id', '=', int(op_admission.state_id.id))])
        courses = request.env['op.course'].sudo().search([('id', '=', int(op_admission.course_id.id))])
        # branchs = request.env['res.company'].sudo().search([('id', '=', int(op_admission.branch_id.id))])
        admission_register = request.env['op.admission.register'].sudo().search([('id', '=', int(op_admission.register_id.id))])
        # op_academic_history = request.env['op.academic.history'].sudo().search([('op_admission_id', '=', int(admission_id))])
        vals = {
            'op_admission': op_admission,
            'application_date': op_admission.application_date.strftime("%Y-%m-%d %H:%M:%S"),
            'admission_date': op_admission.admission_date.strftime("%Y-%m-%d"),
            'title': title,
            'country': country,
            'state': state,
            'courses': courses,
            # 'branchs': branchs,
            'admission_register': admission_register,
            # 'op_academic_history': op_academic_history,
        }
        return request.render("c2p_custom_webiste_admission_form.admission_form_view", vals)

