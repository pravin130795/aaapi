const common = require('../../utils/common');
const schemas = require('./user-schema');
const user = require('./user-model');
const restler = require('restler');
const constants = require('../../utils/constants');
const logger = require('../../utils/logger')
const config = require('../../configurations/config');


let userLogin = function (req, res) {
    let userLoginData = common.sanitize(req.body, schemas.userLoginDetails, constants.moduleNames.user);
    if (schemas.validate(userLoginData, schemas.userLoginDetails)) {
        user.checkUserLoginDetail(userLoginData).then((userDetails) => {
            // Condition To Check that Whether the User is Authenticated User or not.
            if (userDetails.isVerifiedUser) {
                // Function Call to Generate Token
                common.generateToken(userDetails.user_id, userDetails.userType).then((userTokenDetails) => {
                    userDetails.token = userTokenDetails.token;
                    // Restler Call To Set the Cookie to the Web App
                    restler.postJson(config.get('webAppUrl') + constants.webAppUrl.setToken, { token: userDetails.token }).once('complete', function (webAppResp, webAppData) {
                        if (webAppData.statusCode = constants.externalStatusCodes.success && webAppResp.data === true) {
                            let UserData = getResponseStructure(userDetails);
                            res.status(200).send({
                                code: 2000,
                                messageKey: constants.messageKeys.code_2000,
                                data: UserData
                            });
                        } else {
                            return res.status(400).send({
                                code: 4011,
                                messageKey: constants.messageKeys.code_4011
                            });
                        }
                    });
                }).catch((error) => {
                    return res.status(400).send({
                        code: 4010,
                        messageKey: constants.messageKeys.code_4010
                    });
                });
            } else {
                return res.status(200).send({
                    code: 2005,
                    messageKey: constants.messageKeys.code_2005,
                    data: error
                });
            }
        }).catch((error) => {
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

let getResponseStructure = function(options){
    let respData ={
        "user_id": options.user_id,
        "user_name": options.user_name,
        "is_active": options.is_active,
        "isVerifiedUser": options.isVerifiedUser,
        "userType": options.userType,
        "token" : options.token
    };
    return respData;
}

let addUser = function (req, res) {
    let userData = common.sanitize(req.body, schemas.userDetails, constants.moduleNames.user);
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