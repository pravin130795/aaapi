const _ = require('lodash');
const Op = global.sqlInstance.sequelize.Op;

const constants = require('../../utils/constants');

/** @namespace */
let master = function () {

};

//
const sqlInstance = global.sqlInstance.sequelize.models;
//
/**
 * API To Insert Designation Details to the Database
 * @param {string} designation_name - Represents the Designation Name.
 * @returns {object} response - Designation details
 */
master.addDesignationDetail = function (options) {
    return new Promise((resolve, reject) => {
        global.sqlInstance.sequelize.models.designation.findOrCreate({
            where: { designation_name: options.designation_name },
            defaults: { designation_name: options.designation_name, created_by: options.current_user_id, updated_by: options.current_user_id }
        })
            .spread((user, created) => {
                if (created) {
                    return resolve(user);
                } else {
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
                    updated_at: new Date(),
                    updated_by: options.current_user_id
                })
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
                    [Op.or]: new Array({
                        'designation_name': { [Op.like]: '%' + search + '%' }
                    }
                    )
                };
                whereCondition[Op.and].push(orCondition, { is_active: status });
                Condition = whereCondition;
            }
        }
        global.sqlInstance.sequelize.models.designation.findAll({ where: Condition })
            .then((response) => {
                resolve(response);
            }).catch((error) => {

                reject(error);
            });
    });
}

/* Specifications Heading Master */
/**
 * API To Insert Specifications Heading Master Details to the Database
 * @param {string} name - Represents the Specification Heading Name.
 * @param {string} name_arabic - Represents the Specification Heading Name in Arabic.
 * @param {number} sequence - Represents the Sequence value.
 * @param {number} created_by - Represents the Id of the user who created the value.
 * @param {bit} is_active - Represents the Status of the Specification Heading
 */
master.addSpecsHeadingDetail = function (options) {
    return new Promise((resolve, reject) => {
        sqlInstance.specsHeadingMaster.create(options).then((response) => {
            resolve(response)
        }).catch((error) => {
            if (error.name === "SequelizeUniqueConstraintError") {
                resolve({ message: 'specification heading name should be unique' })
            } else {
                reject(error);
            }
        })
    });
}
/**
 * API To Get Specifications Heading Master Details to the Database
 * @param {string} search - Represents the Specification Heading Name filter.
 * @param {bit} is_active - Represents the Status of the Specification Heading filter.
 */
master.getSpecsHeadingLists = function (options) {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { status, search } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof search != 'undefined' && search != '') {
            Condition['name'] = { $like: '%' + search + '%' }
        }
        sqlInstance.specsHeadingMaster.findAll({ where: Condition })
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
    });
}
/**
 * API To Update Specifications Heading Master Details to the Database
 * @param {number} specs_heading_id - Represents the Id of the Specification Heading Name.
 * @param {string} name - Represents the Specification Heading Name.
 * @param {string} name_arabic - Represents the Specification Heading Name in Arabic.
 * @param {number} sequence - Represents the Sequence value.
 * @param {number} updated_by - Represents the Id of the user who updated the value.
 * @param {bit} is_active - Represents the Status of the Specification Heading
 */
master.updateSpecsHeadingDetail = function (options) {
    return new Promise((resolve, reject) => {
        sqlInstance.specsHeadingMaster.update(options, {
            where: { specs_heading_id: options.specs_heading_id }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}

/* Specifications Master */
/**
 * API To Insert Specifications Master Details to the Database
 * @param {string} name - Represents the Specification Name.
 * @param {number} specs_heading_id - Represents the Id of Specification Heading Master Type
 * @param {string} value - Represents the Specification Values (Comma separated).
 * @param {string} value_arabic - Represents the Specification Values (Comma separated) in arabic.
 * @param {number} sequence - Represents the Sequence value.
 * @param {bit} is_active - Represents the Status of the Specification Heading
 */
master.addSpecsDetail = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.specsMaster.create(options).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}
/**
 * API To Insert Specifications Master Details to the Database
 * @param {string} name - Represents the Specification Name for Filter.
 * @param {number} specs_heading_id - Represents the Id of Specification Heading Master Type for Filter
 * @param {bit} is_active - Represents the Status of the Specification Heading for Filter
 */
master.getSpecificationDetails = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { status, name, heading } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof name != 'undefined' && name != '') {
            Condition['name'] = { $like: '%' + name + '%' };
        }
        if (typeof heading != 'undefined' && heading != '') {
            Condition['specs_heading_id'] = Number(heading);
        }
        sqlInstance.specsMaster.findAll({
            where: Condition,
            attributes: ['name', 'value', 'value_arabic', 'is_active'],
            include: [{
                model: sqlInstance.specsHeadingMaster,
                as: 'specs_heading',
                attributes: ['name']
            }]
        })
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
    });
}
/**
 * API To Update Specifications Master Details to the Database
 * @param {number} specs_id - Represents the Id of the Specification Name.
 * @param {string} name - Represents the Specification Name.
 * @param {number} specs_heading_id - Represents the Id of Specification Heading Master Type
 * @param {string} value - Represents the Specification Values (Comma separated).
 * @param {string} value_arabic - Represents the Specification Values (Comma separated) in arabic.
 * @param {number} sequence - Represents the Sequence value.
 * @param {bit} is_active - Represents the Status of the Specification Heading
 */
master.updateSpecsDetail = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.specsMaster.update(options, {
            where: { specs_id: options.specs_id }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}

/* Years Master */
/**
 * API To Insert Year Details to the Database
 * @param {number} year - Represents the Year.
 * @param {string} type - Represents the Type of Car (New/CPOV)
 * @param {bit} is_active - Represents the Status of the Year
 */
master.addYearDetail = function (options) {
    return new Promise((resolve, reject) => {
        sqlInstance.yearMaster.create(options).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}
/**
 * API To Get Year Details to the Database
 * @param {number} year - Represents the Year for Filter.
 * @param {string} type - Represents the Type of Car (New/CPOV) for Filter
 * @param {bit} is_active - Represents the Status of the Year for Filter
 */
master.getYearLists = function (options) {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { status, type, year } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof year != 'undefined' && year != '') {
            Condition['year'] = { $like: '%' + Number(year) + '%' }
        }
        if (typeof type != 'undefined' && type != '') {
            Condition['type'] = { $like: '%' + type + '%' }
        }
        sqlInstance.yearMaster.findAll({ where: Condition })
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
    });
}
/**
 * API To Update Year Details to the Database
 * @param {number} year_id - Represents 
 * @param {number} year - Represents the Year.
 * @param {string} type - Represents the Type of Car (New/CPOV)
 * @param {bit} is_active - Represents the Status of the Year
 */
master.updateYearDetail = function (options) {
    return new Promise((resolve, reject) => {
        sqlInstance.yearMaster.update(options, {
            where: { year_id: options.year_id }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}

/* Color Master */

/* Accessory Category Master */
/**
 * API To Insert Accessory Category Master Details to the Database
 * @param {string} name - Represents the name of the Category.
 * @param {string} name_arabic - Represents the name of the Category in arabic
 * @param {number} sequence - Represents the sequence of the Category
 * @param {bit} is_active - Represents the Status of the Category
 */
master.addAccessoryCategory = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.accessoryCatMaster.create(options).then(response => {
            resolve(response)
        }).catch(error => {
            if (error.name === "SequelizeUniqueConstraintError") {
                resolve({ message: 'Accessory category name should be unique' })
            } else {
                reject(error);
            }
        })
    });
}
/**
 * API To Get Accessory Category Master Details from the Database
 * @param {string} name - Represents the name of the Category for Filter.
 * @param {bit} is_active - Represents the Status of the Category for Filter
 */
master.getAccessoryCatDetails = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { status, name } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof name != 'undefined' && name != '') {
            Condition['name'] = { $like: '%' + name + '%' };
        }
        sqlInstance.accessoryCatMaster.findAll({ where: Condition })
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
    });
}
/**
 * API To Update Accessory Category Master Details to the Database
 * @param {number} accessory_cat_id - Represents the Id of the Category
 * @param {string} name - Represents the name of the Category.
 * @param {string} name_arabic - Represents the name of the Category in arabic
 * @param {number} sequence - Represents the sequence of the Category
 * @param {bit} is_active - Represents the Status of the Category
 */
master.updateAccessoryCategory = function (options) {
    return new Promise((resolve, reject) => {
        sqlInstance.accessoryCatMaster.update(options, {
            where: { accessory_cat_id: options.accessory_cat_id }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}


/* Response Status Master */
/**
 * API To Insert Response Status Master Details to the Database
 * @param {string} status - Represents the Response Type.
 * @param {bit} is_active - Represents the Response status
 * @param {number} created_by - Represents the User Id for user who created response
 * @param {number} updated_by - Represents the User Id for user who updated response
 */
master.addResponseStatus = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.responseStatusMaster.create(options).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}
/**
 * API To Get Response Status Master Details from the Database
 * @param {string} status - Represents the name of the Response for Filter.
 * @param {bit} rspStatus - Represents the Status of the Response for Filter
 */
master.getResponseStatusList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { status, rspStatus } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof rspStatus != 'undefined' && rspStatus != '') {
            Condition['status'] = { $like: '%' + rspStatus + '%' };
        }
        sqlInstance.responseStatusMaster.findAll({ where: Condition })
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
    });
}
/**
 * API To Update Response Status Master Details to the Database
 * @param {number} rsp_status_id - Represents the Id of the Response Status
 * @param {string} status - Represents the name of the Response Status Type.
 * @param {bit} is_active - Represents the Status of the Response
 */
master.updateResponseStatus = function (options) {
    return new Promise((resolve, reject) => {
        sqlInstance.responseStatusMaster.update(options, {
            where: { rsp_status_id: options.rsp_status_id }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}

/* Bank EMI Master */
/**
 * API To Insert Response Status Master Details to the Database
 * @param {string} name - Represents the name of Bank.
 * @param {float} emi - Represents the EMI % offered by the Bank
 * @param {bit} is_active - Represents the Bank status
 * @param {number} created_by - Represents the User Id for user who created Bank
 * @param {number} updated_by - Represents the User Id for user who updated Bank
 */
master.addBankDetails = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.bankMaster.create(options).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}
/**
 * API To Get Bank EMI Master Details from the Database
 * @param {string} name - Represents the name of the Response for Filter.
 * @param {bit} status - Represents the Status of the Response for Filter
 */
master.getBankEmiList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { status, name } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof name != 'undefined' && name != '') {
            Condition['name'] = { $like: '%' + name + '%' };
        }
        sqlInstance.bankMaster.findAll({ where: Condition })
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
    });
}
/**
 * API To Update Bank Master Details to the Database
 * @param {number} bank_id - Represents the Id of the Bank
 * @param {string} name - Represents the name of Bank.
 * @param {float} emi - Represents the EMI % offered by the Bank 
 * @param {bit} is_active - Represents the Bank status
 * @param {number} updated_by - Represents the User Id for user who updated Bank
 */
master.updateBankemiDetails = function (options) {
    return new Promise((resolve, reject) => {
        sqlInstance.bankMaster.update(options, {
            where: { bank_id: options.bank_id }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}

module.exports = master;