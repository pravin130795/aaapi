const util = require('util');
const _ = require('lodash');
const csrf = require('csurf');
const constants = require('../utils/constants');
const logger = require('../utils/logger');
const user = require('../users/user-model');
const config = require('../configurations/config');

module.exports = function (app) {
	// Check header for csrf token
	app.use(function (req, res, next) {
		if (req.method.toLowerCase() === 'post') {
			next();
		} else if (req.method.toLowerCase() === 'post' && _.isUndefined(req.header('x-xsrf-token'))) {
			logger.warn('request without token  from: ' + req.url);
			res.status(403).send({
				code: 4006,
				messageKey: constants.messageKeys.code_4006,
				data: {}
			});
		} else {
			next();
		}
	});

	// Intialize CSRF middleware
	app.use(csrf());

	app.use(function (req, res, next) {
		logger.info(util.format('Request: URL:%s - SessionID:%s', req.url, req.sessionID));
		let token = req.csrfToken();
		// for web and mobile application
		res.header('XSRF-TOKEN', token);
		if (req.method.toLowerCase() === 'post') {
			next();
		} else if (req.method.toLowerCase() === 'get' && req.isAuthenticated()) {
			if (!_.isUndefined(req.header('x-xsrf-token'))) {
				// Valid user
				next();
			} else if (req.isAuthenticated()) {
				// Something went wrong
				user.logout(req.userName).then(function (status) {
					req.logout();
					for (let cookie in req.cookies) {
						res.clearCookie(cookie);
					}
					req.session.destroy();
					res.status(200).end();
				}, function (error) {
					res.status(500).send({
						code: 5000,
						messageKey: constants.messageKeys.code_5000,
						data: {}
					});
				});
			}
		} else {
			next();
		}
	});

	app.use(function (error, req, res, next) {
		if (req.method.toLowerCase() === 'post') {
			next();
		} else {
			if (error.code !== 'EBADCSRFTOKEN') {
				return next(error);
			}
			logger.warn('possible CSRF attack detected');
			res.status(403).send({
				code: 4005,
				messageKey: constants.messageKeys.code_4005,
				data: {}
			});
		}
	});

};