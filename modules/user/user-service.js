const common = require('../../utils/common');
const schemas = require('./user-schema');
const user = require('./user-model');
const constants = require('../../utils/constants');
const logger = require('../../utils/logger')


let userLogin = function(req, res){
    let userLoginData = common.sanitize(req.body, schemas.userLoginDetails,constants.moduleNames.user);
    if (schemas.validate(userLoginData, schemas.userLoginDetails)) {
        user.checkUserLoginDetail(userLoginData).then((response) => {
            res.status(200).send({
                code: 2000,
                messageKey: constants.messageKeys.code_2000,
                data: response
            });
        }).catch((error) => {
            logger.info(error);
            return res.status(500).send({
                code: 5000,
                messageKey: constants.messageKeys.code_5000,
                data: error
            });
        });
    } else {
        // Incomplete Data
        return res.status(400).send({
            code: 4001,
            messageKey: constants.messageKeys.code_4001,
            data: {}
        });
    }  
}


let addUser = function (req, res) {
    let userData = common.sanitize(req.body, schemas.userDetails,constants.moduleNames.user);
    if (schemas.validate(userData, schemas.userDetails)) {
        user.addUserDetail(userData).then((response) => {
            res.status(200).send({
                code: 2000,
                messageKey: constants.messageKeys.code_2000,
                data: response
            });
        }).catch((error) => {
            logger.info(error);
            return res.status(500).send({
                code: 5000,
                messageKey: constants.messageKeys.code_5000,
                data: error
            });
        });
    } else {
        // Incomplete Data
        return res.status(400).send({
            code: 4001,
            messageKey: constants.messageKeys.code_4001,
            data: {}
        });
    }
}

let updateUser = function (req, res) {
    let updateUserData = common.sanitize(req.body, schemas.updateUserDetails, constants.moduleNames.user);
    if (schemas.validate(updateUserData, schemas.updateUserDetails)) {
        user.updateUserDetails(updateUserData).then((response) => {
            res.status(200).send({
                code: 2000,
                messageKey: constants.messageKeys.code_2000,
                data: response
            });
        }).catch((error) => {
            logger.info(error);
            return res.status(500).send({
                code: 5000,
                messageKey: constants.messageKeys.code_5000,
                data: error
            });
        });
    } else {
        // Incomplete Data
        return res.status(400).send({
            code: 4001,
            messageKey: constants.messageKeys.code_4001,
            data: {}
        });
    }
}

let getUsers = function (req, res) {
    let filter = {
        search: req.query.search,
        status: req.query.status
    };
    user.getUserLists(filter).then((response) => {
        res.status(200).send({
            code: 2000,
            messageKey: constants.messageKeys.code_2000,
            data: response
        });
    }).catch((error) => {
        logger.info(error);
        return res.status(500).send({
            code: 5000,
            messageKey: constants.messageKeys.code_5000,
            data: error
        });
    });
}



module.exports = {
    addUser: addUser,
    getUsers: getUsers,
    updateUser: updateUser,
    userLogin: userLogin
}