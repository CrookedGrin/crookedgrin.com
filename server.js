var express = require('express');
var app = express();
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

/*
Load the local .env file so we can run the server locally
Will not return anything on production, but that's ok because
the environment vars are already set via Heroku 
Note that an environment var called NODE_ENV has to be set in .bash_profile
*/
if (process.env.NODE_ENV === 'development') {
	require('dotenv').config();
}

app.set('view engine', 'jade');
if (app.get('env') === 'development') {
	app.locals.pretty = true;
}

app.use('/', express.static(__dirname + '/front/build/'));

app.use(cookieParser());
app.use(bodyParser());

require('./config/passport')(passport);

//Passport
app.use(session({ secret: 'nobodyknowsthetroubleiseen' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


var configDB = require('./config/database.js');
var mongoose = require('mongoose');
var db = mongoose.connect(configDB.url);
var Schema = mongoose.Schema;
var projectSchema = new Schema({
	id: String,
	name: String,
	desc: String,
	url: String,
	github: String,
	priority: Number,
	tags: Array
});
var Project = mongoose.model('Project', projectSchema);

var apiController = require('./controllers/apiController');
apiController(app, Project, passport);

var contactController = require('./controllers/contactController');
contactController(app);

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/front/build/index.html');
});

var port = process.env.PORT || 3000;
app.listen(port);

console.log('App is running.');

