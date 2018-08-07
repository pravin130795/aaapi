module.exports = function(app) {
	const passport = require('passport');
	const user = require('../user/user-model');
	const localStrategy = require('passport-local').Strategy;
	const common = require('../utils/common');

	// instialize passport middleware
	app.use(passport.initialize());
	app.use(passport.session());

	// define local strategy
	let strategy = new localStrategy({
		usernameField : 'userName',
		passwordField : 'password'
	}, function(username, password, next) {
		user.authenticate(username, password).then(function(user) {
			next(null, user)
		}, function(error) {
			next(error);
		});
	});

	// setup local strategy
	passport.use(strategy);

	passport.serializeUser(function(user, next) {
		next(null, user.userName);
	});

	passport.deserializeUser(function(userName, next) {
		user.findOne(userName).then(function(auser) {
			next(null, auser);
		}, function(error) {
			next(error);
		});
	});
};