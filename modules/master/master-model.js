const _ = require('lodash');
const sequelize = require('sequelize');
const util = require('util');
const models = require('../../database/sql');
const logger = require('../../utils/logger');
const constants = require('../../utils/constants');
const Op = global.sqlInstance.sequelize.Op;
const sqlInstance = global.sqlInstance.sequelize.models;

/** @namespace */
let master = function () {

};

//
//
/**
 * API To Insert Designation Details to the Database
 * @param {string} designation_name - Represents the Designation Name.
 * @param {string} is_active - Represents the Designation status.
 * @returns {object} response - Designation details
 */
master.addDesignationDetail = function (options) {
    return new Promise((resolve, reject) => {
        global.sqlInstance.sequelize.models.designation.findOrCreate({
            where: { designation_name: options.designation_name },
            defaults: { designation_name: options.designation_name, 
                created_by: 1,//options.current_user_id, 
                updated_by:1 ,//options.current_user_id 
                is_active:options.is_active
            }
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
 * @param {string} is_active - Represents the Designation status.
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
                    updated_by: 1,//options.current_user_id
                    is_active:options.is_active
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
 * @param {bit} is_active - Represents the Status of the Specification Heading
 */
master.addSpecsHeadingDetail = function (options) {
    return new Promise((resolve, reject) => {
        sqlInstance.specsHeadingMaster.create(options).then((response) => {
            resolve(response)
        }).catch((error) => {
            if (error.name === "SequelizeUniqueConstraintError") {
                reject({ message: 'Specification Heading name should be unique' })
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
            Condition['name'] = { [Op.like]: '%' + search + '%' }
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
        options.updated_at = new Date();
        sqlInstance.specsHeadingMaster.update(options, {
            where: { specs_heading_id: options.specs_heading_id }
        }).then((response) => {
            resolve({ message: 'Specification Heading Updated successfully..!!' });
        }).catch((error) => {
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
            if (error.name === "SequelizeUniqueConstraintError") {
                reject({ message: 'Specification Name should be unique' })
            } else {
                reject(error);
            }
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
        let { status, search, heading } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof search != 'undefined' && search != '') {
            Condition['name'] = { [Op.like]: '%' + search + '%' };
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
        options.updated_at = new Date();
        sqlInstance.specsMaster.update(options, {
            where: { specs_id: options.specs_id }
        }).then(response => {
            resolve({ message: 'Specification Master Updated successfully..!!' });
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
            Condition['year'] = { [Op.like]: '%' + Number(year) + '%' }
        }
        if (typeof type != 'undefined' && type != '') {
            Condition['type'] = { [Op.like]: '%' + type + '%' }
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
        options.updated_at = new Date();
        sqlInstance.yearMaster.update(options, {
            where: { year_id: options.year_id }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}

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
            Condition['name'] = { [Op.like]: '%' + name + '%' };
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
        options.updated_at = new Date();
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
 * @param {bit} is_active - Represents the Status of the Response for Filter
 */
master.getResponseStatusList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { status, rspStatus } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof rspStatus != 'undefined' && rspStatus != '') {
            Condition['status'] = { [Op.like]: '%' + rspStatus + '%' };
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
        options.updated_at = new Date();
        sqlInstance.responseStatusMaster.update(options, {
            where: { rsp_status_id: options.rsp_status_id }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}

/* Area Master */
/**
 * API To Insert Area Master Details to the Database
 * @param {string} name - Represents the name of Area.
 * @param {string} type - Represents the type of Deilvery/Service for the Area
 * @param {bit} is_active - Represents the status of the Area
 * @param {number} created_by - Represents the User Id for user who created response
 * @param {number} updated_by - Represents the User Id for user who updated response
 */
master.addAreaDetails = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.areaMaster.create(options).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}
/**
 * API To Get Area Master Details from the Database
 * @param {string} name - Represents the name of the Area for Filter.
 * @param {bit} status - Represents the Status of the Area for Filter
 */
master.getAreaList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { status, name } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof name != 'undefined' && name != '') {
            Condition['name'] = { [Op.like]: '%' + name + '%' };
        }
        sqlInstance.areaMaster.findAll({where :Condition})
        .then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}
/**
 * API To Update Area Master Details to the Database
 * @param {number} area_id - Represents the Id of the Area
 * @param {string} name - Represents the name of Area.
 * @param {string} type - Represents the type of Deilvery/Service for the Area
 * @param {bit} is_active - Represents the status of the Area
 * @param {number} updated_by - Represents the User Id for user who updated response
 */
master.updateAreaDetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        sqlInstance.areaMaster.update(options,{where: {area_id: options.area_id}
    }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}

// Bank EMI Master
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

/* Lookup Master */
/**
 * API To Insert Lookup Master Details to the Database
 * @param {string} body_name - Represents the name of Vehicle.
 * @param {enum} type - Represents the type of Vehicle(CPOV, New Car)
 * @param {bit} is_active - Represents the status of the Lookup
 * @param {number} created_by - Represents the User Id for user who created lookup
 * @param {number} updated_by - Represents the User Id for user who updated lookup
 */
master.addLookupDetails = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.lookupMaster.create(options).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}
/**
 * API To Get Lookup Master Details from the Database
 * @param {string} body_name - Represents the name of the Response for Filter.
 * @param {bit} status - Represents the Status of the Response for Filter
 */
master.getLookupList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let {status, body_name } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof body_name != 'undefined' && body_name != '') {
            Condition['body_name'] = { [Op.like]: '%' + body_name + '%' };
        }
        sqlInstance.lookupMaster.findAll({where :Condition})
        .then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}
/**
 * API To Update Lookup Master Details to the Database
 * @param {number} lookup_id - Represents the Id of the Response Status
 * @param {string} body_name - Represents the name of Vehicle.
 * @param {enum} type - Represents the type of Vehicle(CPOV, New Car)
 * @param {bit} is_active - Represents the status of the Lookup
 * @param {number} updated_by - Represents the User Id for user who updated lookup
 */
master.updateLookupdetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        sqlInstance.lookupMaster.update(options,{where: {lookup_id: options.lookup_id}
    }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}

/* From To Price Master */
/**
 * API To Insert From To Price Master Details to the Database
 * @param {decimal} from_price - Represents the From Price
 * @param {decimal} to_price - Represents the To Price
 * @param {enum} type - Represents type of vehicle(CPOV, New Car)
 * @param {bit} is_active - Represents the status of the Lookup
 * @param {number} created_by - Represents the User Id for user who created lookup
 * @param {number} updated_by - Represents the User Id for user who updated lookup
 */
master.addFromToPriceDetails = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.fromToPriceMaster.create(options).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}
/**
 * API To Get From To Price Master Details from the Database
 * @param {string} body_name - Represents the name of the Response for Filter.
 * @param {bit} status - Represents the Status of the Response for Filter
 */
master.getFromToPriceList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let {status, search } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof search != 'undefined' && search != '') {
            Condition['from_price'] = { [Op.like]: '%' + search + '%' };
        }
        sqlInstance.fromToPriceMaster.findAll({where :Condition})
        .then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}
/**
 * API To Update Lookup Master Details to the Database
 * @param {number} lookup_id - Represents the Id of the Response Status
 * @param {string} body_name - Represents the name of Vehicle.
 * @param {enum} type - Represents the type of Vehicle(CPOV, New Car)
 * @param {bit} is_active - Represents the status of the Lookup
 * @param {number} updated_by - Represents the User Id for user who updated lookup
 */
master.updateFromToPriceDetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        sqlInstance.fromToPriceMaster.update(options,{where: {from_to_price_id: options.from_to_price_id}
    }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}

/**
 * API To Get Contacts Master Details from the Database
 * @param {string} module_name - Represents the name of the Response for Filter.
 */
master.getContactsList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { search } = options;
        if (typeof search != 'undefined' && search != '') {
            Condition['module_name'] = { [Op.like]: '%' + search + '%' };
        }
        sqlInstance.contactsMaster.findAll({where :Condition})
        .then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}
/**
 * API To Update Contacts Master Details to the Database
 * @param {number} contact_id - Represents the Id of the Module 
 * @param {enum} module_name - Represents the name of Module.
 * @param {string} contact_no - Represents the type of Contact no of module
 * @param {number} updated_by - Represents the User Id for user who updated
 */
master.updateContactDetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        sqlInstance.contactsMaster.update(options,{where: {contact_id: options.contact_id}
    }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
} 

/**
 * API To Get Email Master Details from the Database
 * @param {string} module_name - Represents the name of the Response for Filter.
 */
master.getEmailsList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { search } = options;
        if (typeof search != 'undefined' && search != '') {
            Condition['module_name'] = { [Op.like]: '%' + search + '%' };
        }
        sqlInstance.emailMaster.findAll({where :Condition})
        .then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}
/**
 * API To Update Email Master Details to the Database
 * @param {number} contact_id - Represents the Id of the Module 
 * @param {enum} module_name - Represents the name of Module.
 * @param {string} emp_name - Name of the employee for that module
 * @param {string} email - Email to contact that module
 * @param {string} contact_no - Represents the type of Contact no of module
 * @param {number} updated_by - Represents the User Id for user who updated
 */
master.updateEmailDetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        sqlInstance.emailMaster.update(options,{where: {email_id: options.email_id}
    }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}

/* Km Master */
/**
 * API To Insert Km Master Details to the Database
 * @param {number} km_value - Represents the Km value
 * @param {bit} is_active - Represents the status of the Lookup
 * @param {number} created_by - Represents the User Id for user who created lookup
 * @param {number} updated_by - Represents the User Id for user who updated lookup
 */
master.addKmDetails = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.kmMaster.create(options).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}
/**
 * API To Get From To Price Master Details from the Database
 * @param {string} body_name - Represents the name of the Response for Filter.
 * @param {bit} status - Represents the Status of the Response for Filter
 */
master.getKmList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let {status, search } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof search != 'undefined' && search != '') {
            Condition['km_value'] = { [Op.like]: '%' + search + '%' };
        }
        sqlInstance.kmMaster.findAll({where :Condition})
        .then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}
/**
 * API To Update Lookup Master Details to the Database
 * @param {number} lookup_id - Represents the Id of the Response Status
 * @param {string} body_name - Represents the name of Vehicle.
 * @param {enum} type - Represents the type of Vehicle(CPOV, New Car)
 * @param {bit} is_active - Represents the status of the Lookup
 * @param {number} updated_by - Represents the User Id for user who updated lookup
 */
master.updateKmDetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        sqlInstance.kmMaster.update(options,{where: {km_id: options.km_id}
    }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
} 

/**
 * API To Get Email Master Details from the Database
 * @param {string} module_name - Represents the name of the Response for Filter.
 */
master.getStockList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { search } = options;
        if (typeof search != 'undefined' && search != '') {
            Condition['current_id'] = search;
        }
        sqlInstance.stockMaster.findAll({where :Condition})
        .then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}
/**
 * API To Update Email Master Details to the Database
 * @param {number} contact_id - Represents the Id of the Module 
 * @param {enum} module_name - Represents the name of Module.
 * @param {string} emp_name - Name of the employee for that module
 * @param {string} email - Email to contact that module
 * @param {string} contact_no - Represents the type of Contact no of module
 * @param {number} updated_by - Represents the User Id for user who updated
 */
master.updateStockDetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        sqlInstance.stockMaster.update(options,{where: {stock_id: options.stock_id}
    }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}  

/* Social Media Links Master */
/**
 * API To Insert Social Media Master Details to the Database
 * @param {string} name - Represents the Social Media name
 * @param {string} url - Represents the url
 * @param {bit} is_active - Represents the status of the Lookup
 * @param {number} created_by - Represents the User Id for user who created lookup
 * @param {number} updated_by - Represents the User Id for user who updated lookup
 */
master.addSocialDetails = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.socialMediaMaster.create(options).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}
/**
 * API To Get Social Media Master Details from the Database
 * @param {string} search - Represents the name of the Social media for Filter.
 * @param {bit} status - Represents the Status of the Social media for Filter
 */
master.getSocialList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let {status, search } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof search != 'undefined' && search != '') {
            Condition['name'] = { [Op.like]: '%' + search + '%' };
        }
        sqlInstance.socialMediaMaster.findAll({where :Condition})
        .then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}
/**
 * API To Update Socail Media Master Details to the Database
 * @param {number} social_id - Represents the Id of the Social Media
 * @param {string} name - Represents the Social Media name
 * @param {string} url - Represents the url
 * @param {bit} is_active - Represents the status of the Social media
 * @param {number} updated_by - Represents the User Id for user who updated social media
 */
master.updateSocialDetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        sqlInstance.socialMediaMaster.update(options,{where: {social_id: options.social_id}
    }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
} 

/* Notification Master */
/**
 * API To Insert Social Media Master Details to the Database
 * @param {string} name - Represents the Notification name
 * @param {number} expiry - Represents the expiry time in hrs
 * @param {bit} is_active - Represents the status of the Lookup
 * @param {number} created_by - Represents the User Id for user who created lookup
 * @param {number} updated_by - Represents the User Id for user who updated lookup
 */
master.addNotifyDetails = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.notifyMaster.create(options).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}
/**
 * API To Get Social Media Master Details from the Database
 * @param {string} search - Represents the name of the Social media for Filter.
 * @param {bit} status - Represents the Status of the Social media for Filter
 */
master.getNotifyList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let {status, search } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof search != 'undefined' && search != '') {
            Condition['name'] = { [Op.like]: '%' + search + '%' };
        }
        sqlInstance.notifyMaster.findAll({where :Condition})
        .then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}
/**
 * API To Update Socail Media Master Details to the Database
 * @param {number} social_id - Represents the Id of the Social Media
 * @param {string} name - Represents the Social Media name
 * @param {string} url - Represents the url
 * @param {bit} is_active - Represents the status of the Social media
 * @param {number} updated_by - Represents the User Id for user who updated social media
 */
master.updateNotifyDetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        sqlInstance.notifyMaster.update(options,{where: {notify_id: options.notify_id}
    }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
} 

/* Merchandise Category Master */
/**
 * API To Insert Accessory Category Master Details to the Database
 * @param {string} name - Represents the name of the Category.
 * @param {string} name_arabic - Represents the name of the Category in arabic
 * @param {number} sequence - Represents the sequence of the Category
 * @param {bit} is_active - Represents the Status of the Category
 */
master.addMerchandiseCategory = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.merchandiseCatMaster.create(options).then(response => {
            resolve(response)
        }).catch(error => {
            if (error.name === "SequelizeUniqueConstraintError") {
                resolve({ message: 'Merchandise category name should be unique' })
            } else {
                reject(error);
            }
        })
    });
}
/**
 * API To Get Merchandise Category Master Details from the Database
 * @param {string} name - Represents the name of the Category for Filter.
 * @param {bit} is_active - Represents the Status of the Category for Filter
 */
master.getMerchandiseCatDetails = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { status, name } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof name != 'undefined' && name != '') {
            Condition['name'] = { [Op.like]: '%' + name + '%' };
        }
        sqlInstance.merchandiseCatMaster.findAll({ where: Condition })
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
    });
}
/**
 * API To Update Merchandise Category Master Details to the Database
 * @param {number} merchandise_cat_id - Represents the Id of the Category
 * @param {string} name - Represents the name of the Category.
 * @param {string} name_arabic - Represents the name of the Category in arabic
 * @param {number} sequence - Represents the sequence of the Category
 * @param {bit} is_active - Represents the Status of the Category
 */
master.updateMerchandiseCategory = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        sqlInstance.merchandiseCatMaster.update(options, {
            where: { merchandise_cat_id: options.merchandise_cat_id }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}

/* Autoline Color Master */
/**
 * API To Get CEM Color Master Details from the Database
 */
master.getAutolineColorList = () => {
    return new Promise((resolve, reject) => {
        sqlInstance.autolinenewsMaster.findAll()
        .then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}

/* CEM Color Master */
/**
 * API To Insert Accessory Category Master Details to the Database
 * @param {string} name - Represents the name of the Category.
 * @param {string} name_arabic - Represents the name of the Category in arabic
 * @param {number} sequence - Represents the sequence of the Category
 * @param {bit} is_active - Represents the Status of the Category
 */
master.addColorDetail = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.colorMaster.create(options).then(response => {
            resolve(response)
        }).catch(error => {
            if (error.name === "SequelizeUniqueConstraintError") {
                resolve({ message: 'Color name should be unique' })
            } else {
                reject(error);
            }
        })
    });
}
/**
 * API To Get Merchandise Category Master Details from the Database
 * @param {string} name - Represents the name of the Category for Filter.
 * @param {bit} is_active - Represents the Status of the Category for Filter
 */
master.getColorList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { status, name } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof name != 'undefined' && name != '') {
            Condition['name'] = { [Op.like]: '%' + name + '%' };
        }
        global.sqlInstance.sequelize.query("select  col.color_id, col.name as CEM_color, col.name_arabic, col.color_code, col.is_active, STUFF(("
            +"SELECT ',' + atc.name FROM autoline_color as atc "
            +"left join autoline_to_color as cta on cta.color_id = col.color_id "
            +"WHERE atc.autoline_color_id = cta.autoline_color_id "
            +"FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '') AS autoline_colors "
            +"from colors AS col", {type: global.sqlInstance.sequelize.QueryTypes.SELECT})
        .then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}
/**
 * API To Update Merchandise Category Master Details to the Database
 * @param {number} merchandise_cat_id - Represents the Id of the Category
 * @param {string} name - Represents the name of the Category.
 * @param {string} name_arabic - Represents the name of the Category in arabic
 * @param {number} sequence - Represents the sequence of the Category
 * @param {bit} is_active - Represents the Status of the Category
 */
master.updateColorDetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        sqlInstance.colorMaster.update(options, {
            where: { color_id: options.color_id }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}

/* Autoline Color Map */
/**
 * API To Insert Accessory Category Master Details to the Database
 * @param {string} name - Represents the name of the Category.
 * @param {string} name_arabic - Represents the name of the Category in arabic
 * @param {number} sequence - Represents the sequence of the Category
 * @param {bit} is_active - Represents the Status of the Category
 */
master.addColorMapDetail = (options) => {
    return new Promise((resolve, reject) => {
        mapColorDetails(options.autoline_colors, options.color_id).then((result) => {
            if (!_.isEmpty(result)) {
                resolve("Color mapped successfully");
            } else {
                reject("something went worng..!");
            }
        })
    })
}

let mapColorDetails = function (autoline_colors, color_id, finalResult = {}) {
    return new Promise((resolve, reject) => {
        let dataObj ={};
        if (autoline_colors.length > 0) {
            let object = autoline_colors.pop();
            dataObj.autoline_color_id = object.autoline_color_id;
            dataObj.color_id = color_id;
            sqlInstance.autolineColorMap.create(dataObj)
                .then((response) => {
                    finalResult.result = response;
                    mapColorDetails(autoline_colors, color_id, finalResult).then((result) => {
                        resolve(result);
                    }).catch((error) => {
                        reject(error);
                    });
                })
                .catch((error) => {
                    reject(error);
                })
        } else {
           resolve(finalResult);
        }
    });
}
/**
 * API To Update Merchandise Category Master Details to the Database
 * @param {number} merchandise_cat_id - Represents the Id of the Category
 * @param {string} name - Represents the name of the Category.
 * @param {string} name_arabic - Represents the name of the Category in arabic
 * @param {number} sequence - Represents the sequence of the Category
 * @param {bit} is_active - Represents the Status of the Category
 */
master.updateColorMapDetail = function (options) {
    return new Promise((resolve, reject) => {
        return models.sequelize.transaction({autocommit: false}).then((t) => {
            sqlInstance.autolineColorMap.destroy({
                where: {
                    color_id: options.color_id
                },
                transaction: t
            },{transaction: t}).then((result) => {
                mapColorDetails(options.autoline_colors, options.color_id).then((result) => {
                    if (!_.isEmpty(result)) {
                        t.commit();
                        resolve("Color mapping changed successfully");
                    } else {
                        t.rollback();
                        reject("something went worng..!");
                    }
                })
                .catch(error => {
                    t.rollback();
                    reject(error);
                })
            }).catch((err) => {
                reject(err);
            });
        });
    });
}

/* Monthly News Master */
/**
 * API To Insert News Master Details to the Database
 * @param {string} name - Represents the name of the News.
 * @param {string} name_arabic - Represents the name of the News in arabic
 * @param {number} sequence - Represents the sequence of the News
 * @param {bit} is_active - Represents the Status of the News
 */
master.addNewsDetail = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.newsMaster.create(options).then(response => {
            resolve(response)
        }).catch(error => {
            if (error.name === "SequelizeUniqueConstraintError") {
                resolve({ message: 'News name should be unique' })
            } else {
                reject(error);
            }
        })
    });
}
/**
 * API To Get News Master Details from the Database
 * @param {string} name - Represents the name of the News for Filter.
 * @param {bit} is_active - Represents the Status of the News for Filter
 */
master.getNewsList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { status, name } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof name != 'undefined' && name != '') {
            Condition['name'] = { [Op.like]: '%' + name + '%' };
        }
        sqlInstance.newsMaster.findAll({ where: Condition })
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
    });
}
/**
 * API To Update News Master Details to the Database
 * @param {number} merchandise_cat_id - Represents the Id of the News
 * @param {string} name - Represents the name of the News.
 * @param {string} name_arabic - Represents the name of the News in arabic
 * @param {number} sequence - Represents the sequence of the News
 * @param {bit} is_active - Represents the Status of the News
 */
master.updateNewsDetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        sqlInstance.newsMaster.update(options, {
            where: { news_id: options.news_id }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}

/* Monthly Magazine Master */
/**
 * API To Insert Magazine Master Details to the Database
 * @param {string} name - Represents the name of the Magazine.
 * @param {string} name_arabic - Represents the name of the Magazine in arabic
 * @param {number} sequence - Represents the sequence of the Magazine
 * @param {bit} is_active - Represents the Status of the Magazine
 */
master.addMagazineDetail = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.magazineMaster.create(options).then(response => {
            resolve(response)
        }).catch(error => {
            if (error.name === "SequelizeUniqueConstraintError") {
                resolve({ message: 'Magazine name should be unique' })
            } else {
                reject(error);
            }
        })
    });
}
/**
 * API To Get Magazine Master Details from the Database
 * @param {string} name - Represents the name of the Magazine for Filter.
 * @param {bit} is_active - Represents the Status of the Magazine for Filter
 */
master.getMagazineList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { status, name } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof name != 'undefined' && name != '') {
            Condition['name'] = { [Op.like]: '%' + name + '%' };
        }
        sqlInstance.magazineMaster.findAll({where: Condition })
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
    });
}
/**
 * API To Update Magazine Master Details to the Database
 * @param {number} merchandise_cat_id - Represents the Id of the Magazine
 * @param {string} name - Represents the name of the Magazine.
 * @param {string} name_arabic - Represents the name of the Magazine in arabic
 * @param {number} sequence - Represents the sequence of the Magazine
 * @param {bit} is_active - Represents the Status of the Magazine
 */
master.updateMagazineDetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        sqlInstance.magazineMaster.update(options, {
            where: { news_id: options.news_id }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}

module.exports = master;