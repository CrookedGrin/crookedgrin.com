var bodyParser = require('body-parser');
var util = require('util');

var jsonParser = bodyParser.json();

var configEmail = require ('../config/email');

var nodemailer = require('nodemailer');

module.exports = function(app) {

	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: configEmail.transportUser,
			pass: configEmail.transportPass
		}
	}, {
		from: 'contactform@crookedgrin.com'
		// add default headers here
	});

	var mailOptions = {
		from: 'Contact Form <' + configEmail.fromAddress + ">",
		to: 'Web Contact' + configEmail.toAddress
	}

	app.post('/contact', jsonParser, function(req, res) {
		console.log('Contact form POST recieved. Data: ');
		console.log('   ' + util.inspect(req.body, false, null));
		mailOptions.subject = 'Web contact form: ' + req.body.name;
		mailOptions.html = "<h1>Contact Form Submission</h1>" 
		mailOptions.html += "<p>" + util.inspect(req.body, false, null) + "</p>";
		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				return console.log(error);
			}
			console.log("Email successfully sent. " + info.response);
		})
	});

};