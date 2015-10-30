var express = require('express');
var app = express();
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

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
	tags: Array
});
var Project = mongoose.model('Project', projectSchema);

var apiController = require('./controllers/apiController');
apiController(app, Project, passport);

app.get('*', function(req, res) {
	res.sendfile(__dirname + '/front/build/index.html');
});

var port = process.env.PORT || 3000;
app.listen(port);

console.log('App is running.');

