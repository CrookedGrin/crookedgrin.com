var bodyParser = require('body-parser');
var util = require('util');

var jsonParser = bodyParser.json();

module.exports = function(app) {

	app.post('/contact', jsonParser, function(req, res) {
		console.log('Contact form POST recieved. Data: ');
		console.log('   ' + util.inspect(req.body, false, null));
	});

};