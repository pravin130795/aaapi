const _ = require('lodash');

const constants = require('../../utils/constants');

/** @namespace */
let master = function () {

};

/**
 * API To Insert Designation Details to the Database
 * @param {string} designation_name - Represents the Designation Name.
 * @returns {object} response - Designation details
 */
master.addDesignationDetail = function (options) {
    return new Promise((resolve, reject) => {
        global.sqlInstance.sequelize.models.designation.findOrCreate({
            where: {designation_name: options.designation_name},
             defaults: {designation_name: options.designation_name,created_by:options.current_user_id,updated_by:options.current_user_id}})
        .spread((user, created) => {
          if(created){
            return resolve(user);
          }else{
             return resolve('designation already in use, retry with new.');
          }
        })
    });
}


/**
 * API To Update Designation Details to the Database
 * @param {string} designation_id - Represents the Designation ID.
 * @param {string} designation_name - Represents the Designation Name.
 * @returns {object} response - Designation details
 */
master.updateDesignationDetail = function (options) {
    return new Promise((resolve, reject) => {
        global.sqlInstance.sequelize.models.designation.findOne({
            where: {
                designation_id: options.designation_id
            }
        }).then(designationExist => {
            if (!_.isEmpty(designationExist)) {
                designationExist.update({ 
                    designation_name: options.designation_name,
                    updated_at:new Date(),
                    updated_by:options.current_user_id })
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            } else {
                return resolve('designation does not exist')
            }
        })
    });
}


/**
 * API To List Designation Details
 * @param {string} search - Represents the search for filter.
 * @param {string} status - Represents the staus for filter.
 * @returns {Array} - Designation Lists
 */
master.getDesignationLists = function (options) {
    return new Promise((resolve, reject) => {
        var whereOrConditon = [];
        var includeObj = [];
        if (typeof options.search != 'undefined' && options.search != '') {
            whereOrConditon.push(
                { designation_name: { $like: '%' + options.search + '%' } }
            );
        }
        if (typeof options.status != 'undefined' && options.stauts != '') {
            whereOrConditon.push(
                { is_active: { $like: '%' + options.status + '%' } }
            );
        }
        if (whereOrConditon.length > 0) {
            includeObj.push({ $or: whereOrConditon });
        }
        global.sqlInstance.sequelize.models.designation.findAll({ where: includeObj })
            .then((response) => {
                resolve(response);
            }).catch((error) => {

                reject(error);
            });
    });
}

module.exports = master;