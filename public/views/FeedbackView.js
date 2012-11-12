var FeedbackFormView = Backbone.View.extend({
	className: 'row',
	template: _.template('<form>\
			<legend>Share the feedback</legend>\
			<div class="control-group">\
				<label for="email">Email:</label>\
				<input type="text" id="email" placeholder="Your email address..." />\
			</div>\
			<div class="control-group">\
				<label for="website">Web site:</label>\
				<input type="text" id="website" placeholder="You website..." />\
			</div>\
			<div class="control-group">\
				<label for="feedback">Feedback:</label>\
				<textarea name="" id="feedback" rows="6" class="input-xxlarge" placeholder="feedback here..."></textarea>\
			</div>\
			<button id="submit" class="btn">Submit</button>\
		</form>'),
	render: function() {
		this.$el.html(this.template());		
	
		return this;
	},
	events: {
		'click #submit': 'submitClicked'
	},
	submitClicked: function(e) {
		e.preventDefault();
		
		var options = {
			success: function() {
				alert('Thanks for the feedback');
			},
			error: function() {
				alert('Oops, your feedback has not been submitted.');
			}
		};
		
		var feedback = {
			email: this.$('#email').val(),
			website: this.$('#website').val(),
			feedback: this.$('#feedback').val()
		};
		
		this.model.save(feedback, options);
	}
});

