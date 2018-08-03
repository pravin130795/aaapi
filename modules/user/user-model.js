const _ = require('lodash');


const Op = global.sqlInstance.sequelize.Op;
const constants = require('../../utils/constants');

/** @namespace */
let user = function () {

};

/**
 * API To Insert User Details to the Database
 * @param {string} user_name - Represents the User Name.
 * @param {string} email - Represents the Email.
 * @param {string} password - Represents the User password.
 * @param {string} mobile_no - Represents the User mobile number.
 * @param {string} approver_person - Represents the approver person.
 * @param {string} designation_id - Represents the designation.
 * @param {string} module_name - Represents the module name.
 * @param {string} updated_by - Represents the current user id.
 * @param {string} created_by - Represents the current user id.
 * @returns {object} response - User details
 */
user.addUserDetail = function (options) {
    return new Promise((resolve, reject) => {

        global.sqlInstance.sequelize.models.users.findOrCreate({
            where: { mobile_no: options.mobile_no },
            defaults: {
                user_name: options.user_name,
                email: options.email,
                password: options.password,
                mobile_no: options.mobile_no,
                approver_person: options.approver_person,
                designation_id: options.designation_id,
                module_name: options.module_name,
                updated_by: options.current_user_id,
                created_by: options.current_user_id
            }
        })
        .spread((user, created) => {
            if (created) {
                return resolve(user);
            } else {
                return resolve('user already in use, retry with new.');
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
 * @param {string} designation_id - Represents the designation.
 * @param {string} module_name - Represents the module name.
 * @param {string} updated_by - Represents the current user id.
 * @param {string} created_by - Represents the current user id.
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
                options.updated_a= new Date();
                options.updated_by= options.current_user_id;
                userExist.update(options)
                    .then((response) => {
                       return resolve(response)
                    })
                    .catch((error) => {
                       logger.error(util.format("TYPE THE EXCEPTION. %j",error))
                       return reject(error)
                    })
            } else {
                return resolve('designation does not exist')
            }
        })
    });
},



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
                Condition['is_active'] = status;
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
        global.sqlInstance.sequelize.models.users.findAll({
            where: Condition,
            include: [
                {
                    model: global.sqlInstance.sequelize.models.designation, as: 'designation_details', required: true,
                    attributes: ['designation_name'],
                }]
        })
        .then((response) => {
            return resolve(response)
         })
         .catch((error) => {
            logger.error(util.format("TYPE THE EXCEPTION. %j",error))
            return reject(error)
         })
    });
}

module.exports = user;