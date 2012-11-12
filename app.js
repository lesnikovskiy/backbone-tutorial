var http = require('http');
var express = require('express');
var app = module.exports = express();
var path = require('path');
var util = require('util');
var engine = require('ejs-locals');
var cradle = require('cradle');

app.configure(function() {
	app.engine('ejs', engine);

	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, '/views'));
	app.set('view engine', 'ejs');
	
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname, '/public')));
	app.use(express.cookieParser());
	app.use(app.router);
	app.use(express.errorHandler({
		dumpExceptions: true, showStack: true
	}));
});

app.get('/', function(req, res) {
	res.redirect('/index.html');
});

app.post('/api/notes', function(req, res) {
	var db = new(cradle.Connection)('127.0.0.1', '5984', {
		auth: {
			username: 'admin',
			password: 'Coffee!12'
		}
	}).database('notes');

	if (req.body) {
		db.save(req.body, function(err, response) {
			if (err) {
				res.json(err);
			}

			if (response) {
				res.json(response);
			}
		});
	}
});

app.put('/api/notes', function(req, res) {
	var db = new(cradle.Connection)('127.0.0.1', '5984', {
		auth: {
			username: 'admin',
			password: 'Coffee!12'
		}
	}).database('notes');

	if (req.body) {
		db.save(req.body.id, req.body, function(err, response) {
			if (err) {
				res.json(err);
			}

			if (response) {
				res.json(response);
			}
		});
	}
});

app.delete('/api/notes', function(req, res) {
	console.log(req.body);
	
	var db = new(cradle.Connection)('127.0.0.1', '5984', {
		auth: {
			username: 'admin',
			password: 'Coffee!12'
		}
	}).database('notes');

	if (req.body) {
		db.remove(req.body.id, req.body.rev, function(err, response) {
			if (err) {
				res.json(err);
			}

			if (response) {
				res.json(response);
			}
		});
	}
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server is listening on port ' + app.get('port'));
});