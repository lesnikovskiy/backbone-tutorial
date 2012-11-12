$(function() {
	var model = new Feedback();
	var view = new FeedbackFormView({model: model});
	
	$('#app').html(view.render().el);
});