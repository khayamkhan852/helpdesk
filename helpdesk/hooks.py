app_name = "helpdesk"
app_title = "Helpdesk"
app_publisher = "Khayam Khan"
app_description = "custom updated in the official Frappe Helpdesk application"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "khayamkhan852@gmail.com"
app_license = "AGPLv3"

before_install = "helpdesk.setup.install.before_install"
after_install = "helpdesk.setup.install.after_install"
after_migrate = "helpdesk.search.build_index_in_background"

scheduler_events = {
	"all": ["helpdesk.search.build_index_if_not_exists"],
}


website_route_rules = [
	{
		"from_route": "/helpdesk/<path:app_path>",
		"to_route": "helpdesk",
	},
]

doc_events = {
	"Contact": {
		"before_insert": "helpdesk.helpdesk.hooks.contact.before_insert",
	},
	"Assignment Rule": {
		"on_trash": "helpdesk.overrides.on_assignment_rule_trash",
	},
}

has_permission = {
	"HD Ticket": "helpdesk.helpdesk.doctype.hd_ticket.hd_ticket.has_permission",
}

permission_query_conditions = {
	"HD Ticket": "helpdesk.helpdesk.doctype.hd_ticket.hd_ticket.permission_query",
}

ignore_links_on_delete = [
	"HD Notification",
	"HD Ticket Comment",
]

# setup wizard
# setup_wizard_requires = "assets/helpdesk/js/setup_wizard.js"
# setup_wizard_stages = "helpdesk.setup.setup_wizard.get_setup_stages"
setup_wizard_complete = "helpdesk.setup.setup_wizard.setup_complete"


website_route_rules = [
    {"from_route": "/helpdesk/<path:app_path>", "to_route": "helpdesk"},
]