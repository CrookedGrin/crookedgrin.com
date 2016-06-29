var bodyParser = require('body-parser');
var util = require('util');
var jsonParser = bodyParser.json();
var configEmail = require ('../config/email');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

var auth = {
	auth: {
		api_key: configEmail.apiKey,
		domain: configEmail.domain // DNS & MX records set up for this subdomain with hosting company, via cpanel
	}
}

var transporter = nodemailer.createTransport(mg(auth));

module.exports = function(app) {

	var mailOptions = {
		from: 'Contact Form <' + configEmail.fromAddress + ">",
		to: 'Web Contact <' + configEmail.toAddress + ">"
	}

	app.post('/contact', jsonParser, function(req, res) {
		console.log('Contact form POST recieved. Data: ');
		console.log('   ' + util.inspect(req.body, false, null));
		mailOptions.subject = 'Web contact form: ' + req.body.name;
		mailOptions.html = "<h1>Contact Form Submission</h1>" 
		mailOptions.html += "<p><b>Name:</b> " + req.body.name + "</p>";
		mailOptions.html += "<p><b>Email:</b> <a mailto:'" + req.body.email + "'>" + req.body.email + "</a></p>";
		mailOptions.html += "<p><b>Message:</b><br><pre>" + req.body.message + "</pre></p>";
		mailOptions.html += "<p>" + util.inspect(req.body, false, null) + "</p>";
		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				console.log("Error sending email. " + error + "; info: " + info);
				res.send(500);
			} else {
				console.log("Email successfully sent. " + info);
				res.send(200);
			}
			transporter.close();
		});

	});

};