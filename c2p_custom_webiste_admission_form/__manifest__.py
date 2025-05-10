{
    'name': "Custom Webiste Admission Form",
    'summary': "Custom Webiste Admission Form",
    'description': """
        Custom Webiste Admission Form
    """,
    'author': "Core2Plus",
    'category': 'Core2Plus/CustomWebisteAdmissionForm',
    'sequence': 1,
    'version': '17.0',
    'website': 'https://core-2-plus.odoo.com/',
    'depends': ['base', 'website', 'openeducat_admission', 'openeducat_core'],
    'data': [
        # 'security/ir.model.access.csv',
        'data/data.xml',
        # 'views/view.xml',
    ],
    'license': 'OEEL-1',
    'assets': {
        'web.assets_backend': [],
        'web.assets_frontend': [
             'c2p_custom_webiste_admission_form/static/src/js/script.js',
        ],
    },
    'application': True,
    'installable': True,
    'auto_install': False,
}