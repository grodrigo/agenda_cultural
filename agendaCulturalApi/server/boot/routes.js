module.exports = function(app) {
	// Install a "/ping" route that returns "pong"
	app.get('/resetDB', function(req, res) {
	var customUser = app.models.customUser;
	var eventReview = app.models.eventReview;

	customUser.remove({});
	eventReview.remove({});

    res.send('pong');
  });
}
