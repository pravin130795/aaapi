
const constants = require('../../utils/constants');

/** @namespace */
let user = function () {

};

/**
 * API To Insert Or Update Customer Details to the Database
 * @param {string} designation_name - Represents the Designation Name.
 */
user.addUserDetail = function (options) {
    return new Promise((resolve, reject) => {

        global.sqlInstance.sequelize.models.user.findOrCreate({
            where: { mobile_no: options.mobile_no },
             defaults: {
                user_name: options.user_name,
                email: options.email,
                password:options.password,
                mobile_no:options.mobile_no,
                approver_person:options.approver_person,
                designation_id:options.designation_id,
                updated_by:options.current_user_id,
                created_by:options.current_user_id
            }})
        .spread((user, created) => {
          if(created){
            return resolve(user);
          }else{
             return resolve('user already in use, retry with new.');
          }
        })

    })

},

user.updateRoleDetails = function (options) {
    return new Promise((resolve, reject) => {
        global.sqlInstance.sequelize.models.role.findOne({role_id: options.role_id})
        .then(roleData => {
            delete options["role_id"];
            roleData.updateAttributes(options)
                .then(response => resolve(response))
                .catch(error => reject(error))
        });
    })
},

user.getRoleLists = function (options) {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let {status, search } = options;

        if (typeof status != 'undefined') {
            if (status != '') {
                Condition['is_active'] = status;
            }
        }
        if (search != '') {
            let whereCondition = {
                '$and': new Array()
            };
            if (typeof search != 'undefined') {
                let orCondition = {
                    "$or": new Array({
                        'role_name': { $like: '%' + search + '%' }
                    },
                        {
                            'role_description': { $like: '%' + search + '%' }
                        }
                    )
                };
                whereCondition['$and'].push(orCondition, { is_active: status });
                Condition = whereCondition;
            }
        }

        global.sqlInstance.sequelize.models.role.findAll({ where: Condition })
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
    });
}

module.exports = user;