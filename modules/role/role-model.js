const _ = require('lodash');
const async = require('async');
const constants = require('../../utils/constants');

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
        let iObject = {
            role_name: options.role_name,
            role_description: options.role_description,
            created_by: 0,
            updated_by: 0
        };
        global.sqlInstance.sequelize.models.role.findOne({where: {
            role_name: options.role_name.trim()
        }}).then(roleExist => {
            if(_.isEmpty(roleExist)){
                global.sqlInstance.sequelize.models.role.create(iObject).then((roleCreated) => {
                    if (!_.isEmpty(roleCreated)) {
                        let dataObj ={};

                        async.map(options.page_access, function(page, callback) {
                            dataObj.role_id = roleCreated.role_id;
                            dataObj.menu_item_id = page.menu_item_id;
                            dataObj.can_view = page.view;
                            dataObj.can_create = page.add;
                            dataObj.can_update = page.edit
                            dataObj.can_delete = page.delete;
                            dataObj.can_approve = page.process_approval;
                            dataObj.can_export = page.export;
                            dataObj.can_reject = page.reject;
                            dataObj.created_by = options.current_user_id;
                            dataObj.updated_by = options.current_user_id;
                            
                        return callback(null,global.sqlInstance.sequelize.models.role_permission.create(dataObj))
                        }, function(err, results) {
                            return resolve('Role create successfully');
                        });
                    } else {
                       return reject('Role creation Failed');
                    }
                });
            }else{
               return reject('Role name already in use, retry with new.');
            }
        })
    })

},


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
        global.sqlInstance.sequelize.models.role.findOne({
            where: {
                role_id: options.role_id
            }
        }).then(roleExist => {
            if (!_.isEmpty(roleExist)) {
                let obj = {
                    role_name: options.role_name,
                    role_description: options.role_description,
                    updated_by: 0
                }
                roleExist.update(obj).then(function (roleUpdated) {

                    let dataObj = {};

                    async.map(options.page_access, function (page, callback) {

                        global.sqlInstance.sequelize.models.role_permission.findOne({
                            where: {
                                menu_item_id: page.menu_item_id,
                                role_id: options.role_id
                            }
                        }).then(function (permissionExist) {
                            //console.log("permissionData",permissionExist);
                            if (!_.isEmpty(permissionExist)) {
                                //exist permission, so update here
                                var upObj = {};
                                upObj.updated_by = 0 //req.currentUser.id;
                                upObj.can_create = page.add; // 1- true, 0- false
                                upObj.can_view = page.view; // 1- true, 0- false
                                upObj.can_update = page.edit; // 1- true, 0- false
                                upObj.can_delete = page.delete; // 1- true, 0- false
                                upObj.can_report = page.report; // 1- true, 0- false
                                upObj.can_approve = page.process_approval; // 1- true, 0- false
                                upObj.can_reject = page.reject; // 1- true, 0- false
                                upObj.can_export = page.export; // 1- true, 0- false
                                upObj.updated_by = options.current_user_id;
                                upObj.updated_at = new Date();
                                upObj.is_active = 1;
                                permissionExist.update(upObj).then(updatedPage => {
                                    return callback(updatedPage);
                                });
                            } else {
                                //create permissions here
                                var inObj = {};
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
                                inObj.created_by = options.current_user_id;
                                inObj.updated_by = options.current_user_id;
                                global.sqlInstance.sequelize.models.role_permission.create(inObj).then(newPermissions => {
                                    return callback(newPermissions);
                                });
                            }
                        });
                    }, function (err, results) {
                        return resolve('Role update successfully');
                    });

                })
                    .catch(error => {
                        reject(error)
                    })
            } else {
                // role is not exist
                return reject("role is not exist");
            }
        })
    })
},

/**
 * API To List Role Details and Role Permissions
 * @param {string} search - Represents the search for filter.
 * @param {string} status - Represents the staus for filter.
 * @returns {Array} - Role Lists
 */

role.getRoleLists = function (options) {
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
        global.sqlInstance.sequelize.models.role_permission.findAll({
            include: [
                {
                    model: global.sqlInstance.sequelize.models.role, as: 'role_details', required: true,
                    attributes: ['role_name', 'role_description', 'is_active'],
                    where: Condition
                }]
        })
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
    });
}


module.exports = role;