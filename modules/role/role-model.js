const _ = require('lodash');
const async = require('async');
const util = require('util');
const models = require('../../database/sql');
const logger = require('../../utils/logger');
const constants = require('../../utils/constants');
const Op = global.sqlInstance.sequelize.Op;

/** @namespace */
let role = function () {

};

/**
 * API To Insert Role Details and Role Permission to the Database
 * @param {string} role_name - Represents the role Name.
 * @param {string} role_description - Represents the role description.
 * @param {Array} page_access - Represents the array of page access.
 * @returns {message} - Role create successfully
 */
role.addRoleDetail = function (options) {
    return new Promise((resolve, reject) => {
        return models.sequelize.transaction().then((tran) => {

        let iObject = {
            role_name: options.role_name,
            role_description: options.role_description,
            created_by: 1,
            updated_by: 1,
            is_active: options.is_active,
        };
        global.sqlInstance.sequelize.models.role.create(iObject,{ transaction:tran })
        .then((roleCreated) => {
            if (!_.isEmpty(roleCreated)) {
                return createRole(options.page_access,roleCreated.role_id, tran).then((result) => {
                    if (!_.isEmpty(result)) {
                        tran.commit();
                        resolve({ message: "role create successfully" });
                    } else {
                        tran.rollback();
                        reject("something went worng in role permission");
                    }
                })
            } else {
                tran.rollback();
                return reject('Role creation Failed');
            }
        })
        .catch((error) => {
            if (error.name === "SequelizeUniqueConstraintError") {
                resolve({ message: 'role name should be unique' })
            } else {
                logger.error(util.format("ROLE CREATE EXCEPTION. %j", error))
                reject(error);
            }
        })
        })

    })

}

let createRole = function(roles,role_id, tran, finalResult = {}){
    return new Promise((resolve, reject) => {
        if(roles.length > 0){
            let page = roles.pop();
            let dataObj = {};
                dataObj.role_id = role_id;
                dataObj.menu_item_id = page.menu_item_id;
                dataObj.can_view = page.view;
                dataObj.can_create = page.add;
                dataObj.can_update = page.edit
                dataObj.can_report = page.report;
                dataObj.can_delete = page.delete;
                dataObj.can_approve = page.process_approval;
                dataObj.can_export = page.export;
                dataObj.can_reject = page.reject;
                dataObj.created_by = 1;//options.current_user_id;
                dataObj.updated_by = 1;//options.current_user_id;
                dataObj.is_active = page.is_active;
                return global.sqlInstance.sequelize.models.role_permission.create(dataObj,{transaction:tran})
                .then((createResp) =>{
                    finalResult.result = createResp;
                    createRole(roles,role_id, tran, finalResult).then((result) => {
                        resolve(result);
                    }).catch((error) => {
                        reject(error);
                    });
                })
        }else{
            resolve(finalResult);
        }
    })
}

/**
 * API To Update Role Details and Role Permission to the Database
 * @param {integer} role_id - Represents the role ID.
 * @param {string} role_name - Represents the role Name.
 * @param {string} role_description - Represents the role description.
 * @param {Array} page_access - Represents the array of page access.
 * @returns {message} - Role update successfully
 */
role.updateRoleDetails = function (options) {
    return new Promise((resolve, reject) => {
        return models.sequelize.transaction().then((tran) => {
        let obj = {
            role_name: options.role_name,
            role_description: options.role_description,
            updated_at: new Date(),
            is_active: options.is_active,
            updated_by: 1
        }
        global.sqlInstance.sequelize.models.role.update(obj, {
            where: { role_id: options.role_id }
        },{ transaction:tran }).then((roleUpdated) => {
            if (roleUpdated[0] > 0) {
                return updateRole(options.page_access, options.role_id, tran).then((result) => {
                    if (!_.isEmpty(result)) {
                        tran.commit();
                        resolve({ message: "role update successfully" });
                    } else {
                        tran.rollback();
                        reject("something went worng in role permission");
                    }
                })
            } else {
                tran.rollback();
                // role is not exist
                reject("role is not exist");
            }
        })
        .catch((error) => {
            tran.rollback();
            logger.error(util.format("TYPE THE EXCEPTION. %j", error))
            reject(error)
        })
     })
    })
}

let updateRole = function (roles,role_id ,tran ,finalResult = {}) {

    return new Promise((resolve, reject) => {
        if (roles.length > 0) {
            let page = roles.pop();
            global.sqlInstance.sequelize.models.role_permission.findOne({
                where: {
                    menu_item_id: page.menu_item_id,
                    role_id: role_id
                }
            }).then(function (permissionExist) {
                //console.log("permissionData",permissionExist);
                if (!_.isEmpty(permissionExist)) {
                    //exist permission, so update here
                    let upObj = {};
                    upObj.updated_by = 0 //req.currentUser.id;
                    upObj.can_create = page.add; // 1- true, 0- false
                    upObj.can_view = page.view; // 1- true, 0- false
                    upObj.can_update = page.edit; // 1- true, 0- false
                    upObj.can_delete = page.delete; // 1- true, 0- false
                    upObj.can_report = page.report; // 1- true, 0- false
                    upObj.can_approve = page.process_approval; // 1- true, 0- false
                    upObj.can_reject = page.reject; // 1- true, 0- false
                    upObj.can_export = page.export; // 1- true, 0- false
                    upObj.updated_by = 1;//options.current_user_id;
                    upObj.updated_at = new Date();
                    upObj.is_active = page.is_active;
                    return permissionExist.update(upObj,{ transaction:tran }).then(updatedPage => {
                        finalResult.result = updatedPage;
                        updateRole(roles, role_id, tran, finalResult).then((result) => {
                            resolve(result);
                        }).catch((error) => {
                            reject(error);
                        });
                    });
                } else {
                    //create permissions here
                    let inObj = {};
                    inObj.created_by = 0 //req.currentUser.id;
                    inObj.updated_by = 0 //req.currentUser.id;
                    inObj.role_id = options.role_id;
                    inObj.menu_item_id = page.menu_item_id;
                    inObj.can_view = page.view; // 1- true, 0- false
                    inObj.can_create = page.add; // 1- true, 0- false
                    inObj.can_report = page.report; // 1- true, 0- false
                    inObj.can_update = page.edit; // 1- true, 0- false
                    inObj.can_delete = page.delete; // 1- true, 0- false
                    inObj.can_approve = page.approve; // 1- true, 0- false
                    inObj.can_reject = page.reject; // 1- true, 0- false
                    inObj.can_export = page.export; // 1- true, 0- false
                    inObj.created_by = 1;//options.current_user_id;
                    inObj.updated_by = 1;//options.current_user_id;
                    inObj.is_active = page.is_active;
                    return global.sqlInstance.sequelize.models.role_permission.create(inObj,{ transaction:tran }).then(newPermissions => {
                        finalResult.result = newPermissions;
                        updateRole(roles, role_id, tran, finalResult).then((result) => {
                            resolve(result);
                        }).catch((error) => {
                            reject(error);
                        });
                    });
                }
            });
        } else {
            resolve(finalResult);
        }
    });
}

/**
 * API To List Role Details and Role Permissions
 * @param {string} search - Represents the search for filter.
 * @param {string} status - Represents the staus for filter.
 * @returns {Array} - Role Lists
 */

role.getRoleLists = function (options) {
    return new Promise((resolve, reject) => {
        let Condition ="";
        let { status, search } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition +='AND rol.is_active =' +Number(status);
        }

        if (typeof search != 'undefined' && search != '') {
            Condition += " AND rol.role_name LiKE '%"+search+"%'" ;
            Condition += " OR rol.role_description LiKE '%"+search+"%'" ;

        }
        let query = "";
        query = "select rol.role_id,rol.role_name,rol.role_description,STUFF(( \n"
            +"SELECT ',' + mi.menu_item_name \n" 
            +"FROM menu_item as mi \n"
            +"left join role_permission as role_p on mi.menu_item_id = role_p.menu_item_id \n"
            +"WHERE rol.role_id = role_p.role_id \n"
            +"FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '') AS menu  \n"
            +"from role as rol \n"
            +"WHERE 1 = 1 \n"
            +Condition
            console.log(query)
        global.sqlInstance.sequelize.query(query,{ type:  global.sqlInstance.sequelize.QueryTypes.SELECT}).then(function(users) {
                resolve(users);
          })
          .catch((error) => {
            logger.error(util.format("EXCEPTION FOR GET ROLE LIST %j",error))
             reject(error)
         })
       

    });
}

/**
 * API To Map User to Role
 * @param {integer} user_id - Represents the user id.
 * @param {array} roles - Represents the role ids.
 * @returns {iObject} - Role map response message
 */
role.RoleMapToUser = function (options) {
    return new Promise((resolve, reject) => {

        let dataObj = {};
        async.map(options.roles, function (role, callback) {

            global.sqlInstance.sequelize.models.user_role.findOne({
                where: {
                    user_id: options.user_id,
                    role_id: role.role_id
                }
            }).then(roleMapExist => {
                if (_.isEmpty(roleMapExist)) {
                    dataObj.role_id = role.role_id;
                    dataObj.user_id = options.user_id;

                    return callback(null, global.sqlInstance.sequelize.models.user_role.create(dataObj))
                } else {
                     resolve('Role is already assign to current user');
                }
            })
        }, function (err, results) {
            if (err) {
                logger.error(util.format("EXCEPTION FOR MAP ROLE TO USER. %j",err))
                 reject(err);
            } else {
                 resolve('Role map to user successfully');
            }
        });

    })
}

/**
 * API To List  User Role Details and Role Permissions
 * @param {integer} user_id - Represents the user id.
 * @returns {Array} - User Role Details
 */
role.getUserRoleLists = function (options) {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { user_id } = options;
        if (typeof user_id != 'undefined') {
            if (user_id != '') {
                Condition['user_id'] = user_id;
            }
        }
        global.sqlInstance.sequelize.models.user_role.findAll({
            where: Condition,
            include: [
                {
                    model: global.sqlInstance.sequelize.models.role, as: 'role_details', required: true,
                    attributes: ['role_name', 'role_description', 'is_active']
                }]
        })
        .then((response) => {
             resolve(response)
         })
         .catch((error) => {
            logger.error(util.format("TYPE THE EXCEPTION. %j",error))
             reject(error)
         })
    });
}


module.exports = role;