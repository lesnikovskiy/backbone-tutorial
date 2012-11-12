var Feedback = Backbone.Model.extend({
	url: '/feedback',
	defaults: {
		'email': '',
		'website': '',
		'feedback': ''
	}
});