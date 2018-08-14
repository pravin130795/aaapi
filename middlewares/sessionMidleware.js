const util = require('util');
const base64 = require('base-64');
const moment = require('moment');
const jwt = require("jsonwebtoken");
const logger = require('../utils/logger');
const constants = require('../utils/constants');
const sqlInstance = global.sqlInstance.sequelize.models;

module.exports = {
    verifyToken: function (req, res, next) {
        let authToken = req.headers.authorization;
        let token = req.userCookies.token;
        if (authToken) {
            token = authToken;
        }
        let userId = (jwt.decode(token)) ? jwt.decode(token).userId : '';
        let userType = (jwt.decode(token)) ? jwt.decode(token).userType : '';
        checkValidToken(token, userId, userType, req, next);
    }
};

let checkValidToken = function (token, userId, userType, req, next) {
    if (token) {
        verifyToken(token, function (error, status) {
            if (status === 200) {
                sqlInstance.users.findOne({
                    where: {
                        user_id: userId
                    }
                }, { raw: true }).then((userDetails) => {
                    delete userDetails.password;
                    if (userDetails.is_active === true) {
                        req.isAuthenticatedUser = true;
                        req.user = userDetails;
                        req.userType = userType;
                        next();
                    } else {
                        req.isAuthenticatedUser = false;
                        req.user = userDetails;
                        req.userType = userType;
                        next();
                    }
                });
            } else {
                req.isAuthenticatedUser = false;
                next();
            }
        });
    } else {
        req.isAuthenticatedUser = false;
        next();
    }
};

let verifyToken = function (token, cb) {
    let payload = undefined;
    try {
        payload = JSON.parse(base64.decode(token.split(".")[1]));
    } catch (ex) {
        logger.error(util.format("Error While Splitting the Token. Payload: %j", payload));
    }
    if (payload) {
        // if it's a JWT token and if we have decoded it
        // verify it with the signing password(from config)
        jwt.verify(token, constants.JWT_TOKEN.SECRET, function (error, decoded) {
            if (error) {
                let errorMessage = "Token Expired, Please login again";
                cb(errorMessage, 400);
            } else {
                sqlInstance.userSession.findOne({
                    where: {
                        user_id: payload.userId,
                        uid: payload.uuid
                    },
                    raw: true
                }).then((sessionDetails) => {
                    if (sessionDetails) {
                        if (sessionDetails.ttl > moment().utc().toDate().getTime()) {
                            cb(null, 200);
                        } else {
                            cb("Session Expired...!!", 403)
                        }
                    } else {
                        cb("Invalid Token, Please login again", 403)
                    }
                }).catch((error) => {
                    let errorMessage = "Cannot Find User Details in SQL Session";
                    cb(errorMessage, 400);
                });
            }
        });
    } else {
        cb("Invalid token, please login again.", 400);
    }
};