var bodyParser = require('body-parser');
var util = require('util');

var jsonParser = bodyParser.json();

module.exports = function(app, Project, passport) {


	app.get('/api/login', function(req,res) {
		res.render('api/login', {message: req.flash('loginMessage')});
	});
	app.post('/api/login', passport.authenticate('local-login', {
		successRedirect: '/api/createProject',
		failureRedirect: '/api/login',
		failureFlash: true
	}));

	app.get('/api/signup', function(req,res) {
		res.render('api/signup', {message: req.flash('signupMessage')});
	});
	app.post('/api/signup', passport.authenticate('local-signup', {
		successRedirect: '/api/createProject',
		failureRedirect: '/api/signup',
		failureFlash: true
	}));

	app.get('/api/logout', function(req,res) {
		req.logout();
		res.redirect('/api');
	});

	app.get('/api', function(req,res) {
		res.render('api/home');
	});

	app.get('/api/project/:id', function(req, res) {
		Project.find({id: req.params.id}, function(err, projects) {
			if (err) throw err;
			if (projects.length > 0) {
				res.json(projects);
			} 
		});
	});

	app.get('/api/projects', function(req, res) {
		Project.find({}, function(err, projects) {
			if (err) throw err;
			res.json(projects);
		});
	});

	app.get('/api/createproject', isLoggedIn, function(req, res) {
		res.render('api/createProject');
	});
	app.post('/api/project', jsonParser, isLoggedIn, function(req, res, next) {
		console.log("POST recieved with body: " + util.inspect(req.body, false, null));
		var projId = req.body.id;
		Project.find({id: projId}, function(err, projects) {
			if (projects.length > 0) {
				res.json({'success':false, 'msg':'A project already exists with id ' + projId, 'data': projects});
			} else {
				var item = Project(req.body);
				item.save(function(err, doc) {
					if (err) throw err;
					console.log('Project saved with id ' + doc._id);
					res.json({'success':true, 'msg': 'Project saved with id '+ projId, 'data': doc});
				});
			}
		})
	});

	app.get('/api/updateproject', isLoggedIn, function(req, res) {
		res.render('api/updateProject');
	});
	app.put('/api/project', jsonParser, isLoggedIn, function(req, res, next) {
		console.log("PUT recieved with body: " + util.inspect(req.body, false, null));
		delete req.body.objs;
		var projId = req.body.id;
		var query = {'id': projId}
		Project.findOneAndUpdate(query, req.body, {upsert:true}, function(err, doc) {
			if (err) throw err;
			return res.json({'success':true, 'msg': 'Project updated with id '+ projId, 'data': doc})
		})
	});

	app.get('/api/deleteproject', isLoggedIn, function(req, res) {
		res.render('api/deleteProject');
	});
	app.delete('/api/project', jsonParser, isLoggedIn, function(req, res, next) {
		console.log("DELETE recieved with body: " + util.inspect(req.body, false, null));
		var projId = req.body.id;
		Project.remove({id:projId}, function(err, doc) {
			if (err) throw err;
			return res.json({'success':true, 'msg': 'Project deleted with id '+ projId, 'data': doc})
		});
	});
}

function isLoggedIn(req, res, next) {
	console.log('IsLoggedIn? ');
	if (req.isAuthenticated()) {
		console.log("  User suceessfully authenticated.");
		return next();
	}
	res.redirect('/api');
}