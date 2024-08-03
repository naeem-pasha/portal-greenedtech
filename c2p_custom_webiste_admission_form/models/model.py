from odoo import models, fields, api, _


class OPCourseInherit(models.Model):
    _inherit = 'op.course'
    _description = 'Inherit Course Models'

    # branch_id = fields.Many2one('res.company', string="Branch")


class OPAdmissionRegisterInherit(models.Model):
    _inherit = 'op.admission.register'
    _description = 'Inherit Admission Register Models'

    # branch_id = fields.Many2one('res.company', string="Branch", required=True, states={'done': [('readonly', True)]})


class OPAdmissionInherit(models.Model):
    _inherit = 'op.admission'
    _description = 'Inherit Admission Models'

    father_name = fields.Char(
        'Father Name')
    
    mother_name = fields.Char(
        'Mother Name')
    # branch_id = fields.Many2one('res.company', string="Branch")
    # academic_history_ids = fields.One2many('op.academic.history', 'op_admission_id')
