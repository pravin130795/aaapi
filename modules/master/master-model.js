
const constants = require('../../utils/constants');

/** @namespace */
let master = function () {

};

/**
 * API To Insert Or Update Customer Details to the Database
 * @param {string} designation_name - Represents the Designation Name.
 */
master.addDesignationDetail = function (options) {
    return new Promise((resolve, reject) => {
        global.sqlInstance.sequelize.models.designation.create({ designation: options.designation_name })
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}

master.getDesignationLists = function (options) {
    return new Promise((resolve, reject) => {
        var whereOrConditon = [];
        var includeObj = [];
        if(typeof options.search != 'undefined' && options.search != '' ){
              whereOrConditon.push(
                { designation: { $like: '%' + options.search + '%' }}
              );
          }
        if(typeof options.status != 'undefined' && options.stauts != ''){
            whereOrConditon.push(
              { is_active: { $like: '%' + options.status + '%' }}
            );
         }
          if(whereOrConditon.length > 0){
            includeObj.push({$or:whereOrConditon});
          }
        global.sqlInstance.sequelize.models.designation.findAll({where :includeObj })
        .then((response) => {
            resolve(response);
        }).catch((error) => {

            reject(error);
        });
    });
}

module.exports = master;