const _ = require('lodash');
const util = require('util');
const logger = require('../../utils/logger');
const enryption = require('../../utils/encryption');
const constants = require('../../utils/constants');
const Op = global.sqlInstance.sequelize.Op;

/** @namespace */
let user = function () {

};

/**
 * API To check User login Details to the Database
 * @param {string} user_name - Represents the User Name.
 * @param {string} password - Represents the User password.
 * @returns {object} response - User details
 */
user.checkUserLoginDetail = function (options) {
    return new Promise((resolve, reject) => {
        global.sqlInstance.sequelize.models.users.findOne({
            where: {
                user_name: options.user_name
            }, raw: true
        }).then((userDetails) => {
            if (!_.isEmpty(userDetails)) {
                let current_password = enryption.getEncryptedPasswordWithSalt(options.password);
                let db_password = userDetails.password;
                if (current_password === db_password) {
                    userDetails.isVerifiedUser = constants.booleanValue.true;
                    delete userDetails.password;
                    userDetails.userType = "admin";
                    resolve(userDetails)
                } else {
                    userDetails.isVerifiedUser = constants.booleanValue.false;
                    resolve(userDetails)
                }
            } else {
                resolve('user does not exist')
            }
        }).catch((error) => {
            logger.error(util.format("EXCEPTION OF LOGIN USER DETAILS. %j", error))
            reject(error)
        })
    })
}

/**
 * API To Insert User Details to the Database
 * @param {string} user_name - Represents the User Name.
 * @param {string} email - Represents the Email.
 * @param {string} password - Represents the User password.
 * @param {string} mobile_no - Represents the User mobile number.
 * @param {string} approver_person - Represents the approver person.
 * @param {integer} designation_id - Represents the designation.
 * @param {string} module_name - Represents the module name.
 * @param {integer} updated_by - Represents the current user id.
 * @param {integer} created_by - Represents the current user id.
 * @param {boolean} is_active - Represents the status.
 * @returns {object} response - User details
 */
user.addUserDetail = function (options) {
    return new Promise((resolve, reject) => {
        let user_name = new RegExp("^[a-zA-Z0-9._-]*$");
        let pass_word = new RegExp("^(?=.*\\d)(?=.*[@#$%^&+=!*])(?=.*[a-z])(?=.*[A-Z]).{8,}$");
        if (user_name.test(options.username) && pass_word.test(options.password)) {
            global.sqlInstance.sequelize.models.users.findOrCreate({
                where: { user_name: options.user_name },
                defaults: {
                    user_name: options.user_name,
                    email: options.email,
                    password: getEncryptedPasswordWithSalt(options.password),
                    mobile_no: options.mobile_no,
                    approver_person: options.approver_person,
                    designation_id: options.designation_id,
                    module_name: options.module_name,
                    is_active: options.is_active,
                    updated_by: 1,//options.current_user_id,
                    created_by: 1//options.current_user_id
                }
            }).spread((user, created) => {
                if (created) {
                    return resolve("user create successfully");
                } else {
                    return resolve('user already in use, retry with new.');
                }
            })
        } else {
            return resolve('enter valid username or password.');
        }
        global.sqlInstance.sequelize.models.users.findOrCreate({
            where: { user_name: options.user_name },
            defaults: {
                user_name: options.user_name,
                email: options.email,
                password: getEncryptedPasswordWithSalt(options.password),
                mobile_no: options.mobile_no,
                approver_person: options.approver_person,
                designation_id: options.designation_id,
                module_name: options.module_name,
                is_active: options.is_active,
                updated_by: 1,//options.current_user_id,
                created_by: 1//options.current_user_id
            }
        }).spread((user, created) => {
            if (created) {
                resolve("user create successfully");
            } else {
                resolve('user already in use, retry with new.');
            }
        })

    })
},




    /**
     * API To Update User Details to the Database
     * @param {string} user_name - Represents the User Name.
     * @param {string} email - Represents the Email.
     * @param {string} password - Represents the User password.
     * @param {string} mobile_no - Represents the User mobile number.
     * @param {string} approver_person - Represents the approver person.
     * @param {integer} designation_id - Represents the designation.
     * @param {string} module_name - Represents the module name.
     * @param {integer} updated_by - Represents the current user id.
     * @param {integer} created_by - Represents the current user id.
     * @param {boolean} is_active - Represents the status.
     * @returns {object} response - Updated User details
     */
    user.updateUserDetails = function (options) {
        return new Promise((resolve, reject) => {

            options.updated_at = new Date();
            options.updated_by = 1;//options.current_user_id;
            global.sqlInstance.sequelize.models.users.update(options, {
                where: { user_id: options.user_id }
            })
                .then((response) => {
                    if (response[0] > 0) {
                        return resolve(response)
                    } else {
                        return resolve('user does not exist')
                    }
                })
                .catch((error) => {
                    logger.error(util.format("EXCEPTION OF UPDATE USER DETAILS. %j", error))
                    return reject(error)
                })


        });
    }


/**
 * API To Update User Details to the Database
 * @param {string} user_name - Represents the User Name.
 * @param {string} email - Represents the Email.
 * @param {string} password - Represents the User password.
 * @param {string} mobile_no - Represents the User mobile number.
 * @param {string} approver_person - Represents the approver person.
 * @param {integer} designation_id - Represents the designation.
 * @param {string} module_name - Represents the module name.
 * @param {integer} updated_by - Represents the current user id.
 * @param {integer} created_by - Represents the current user id.
 * @param {boolean} is_active - Represents the status.
 * @returns {object} response - Updated User details
 */
user.updateUserDetails = function (options) {
    return new Promise((resolve, reject) => {
        global.sqlInstance.sequelize.models.users.findOne({
            where: {
                user_id: options.user_id
            }
        }).then(userExist => {
            if (!_.isEmpty(userExist)) {
                options.updated_at = new Date();
                options.updated_by = 1;//options.current_user_id;
                userExist.update(options).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    logger.error(util.format("EXCEPTION OF UPDATE USER DETAILS. %j", error))
                    reject(error)
                })
            } else {
                resolve('user does not exist')
            }
        })
    });
}

/**
 * API To List User Details and Role Permissions
 * @param {string} search - Represents the search for filter.
 * @param {string} status - Represents the staus for filter.
 * @returns {Array} - User Lists
 */
user.getUserLists = function (options) {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { status, search } = options;

        if (typeof status != 'undefined') {
            if (status != '') {
                Condition['is_active'] = Number(status);
            }
        }
        if (search != '') {
            let whereCondition = {
                [Op.and]: new Array()
            };
            if (typeof search != 'undefined') {
                let orCondition = {
                    [Op.or]: new Array(
                        {
                            'user_name': { [Op.like]: '%' + search + '%' }
                        },
                        {
                            'email': { [Op.like]: '%' + search + '%' }
                        }
                    )
                };
                whereCondition[Op.and].push(orCondition, { is_active: status });
                Condition = whereCondition;
            }
        }
        console.log("----->", Condition);

        global.sqlInstance.sequelize.models.users.findAll({
            attributes:['user_id','user_name','designation_id','email','mobile_no','approver_person','module_name','is_active'],
            where: Condition,
            include: [
                {
                    model: global.sqlInstance.sequelize.models.designation, as: 'designation_details', required: true,
                    attributes: ['designation_name'],
                }]
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            logger.error(util.format("EXCEPTION OF USER LIST. %j", error))
            reject(error)
        })
    });
}

module.exports = user;