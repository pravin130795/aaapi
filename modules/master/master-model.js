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

            let dataObj ={
                designation_name: options.designation_name,
                updated_at: new Date(),
                updated_by: 1,//options.current_user_id
                is_active:options.is_active
            };
                global.sqlInstance.sequelize.models.designation.update(dataObj,{
                    where:{designation_id: options.designation_id}
                })
                .then(response => {
                if(response[0] > 0){
                    resolve({message:"designation data update successfully"})
                } else {
                    return resolve('designation does not exist')
                }
                })
                .catch(error => {
                    reject(error)
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
            if (response[0] > 0) {
                resolve({ message: 'Specification Heading Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
        sqlInstance.paymentMatrixMaster.create(options).then(response => {
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
 * API To Get Specifications Master Details from the Database
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
            attributes: ['specs_id', 'name', 'value', 'value_arabic', 'is_active', 'is_model_overview', 'is_variant_overview'],
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
            if (response[0]> 0) {
                resolve({ message: 'Specification Master Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
            if (response[0]> 0) {
                resolve({ message: 'Year Master Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
        let { status, search } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof search != 'undefined' && search != '') {
            Condition['name'] = { [Op.like]: '%' + search + '%' };
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
            if (response[0]> 0) {
                resolve({ message: 'Accessory Category Master Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
            if (response[0]> 0) {
                resolve({ message: 'Response Status Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
        if (response[0]> 0) {
            resolve({ message: 'Area Master Updated successfully..!!' });
        } else {
            resolve({ message: 'Row does not exist' });
        }
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
            if (response[0]> 0) {
                resolve({ message: 'Bank EMI Master Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
        sqlInstance.lookupMaster.update(options,{where: {lookup_id: options.lookup_id}}).then(response => {
            if (response[0]> 0) {
                resolve({ message: 'Lookup Master Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
        sqlInstance.fromToPriceMaster.update(options,{where: {from_to_price_id: options.from_to_price_id}}).then(response => {
            if (response[0]> 0) {
                resolve({ message: 'From to Price Master Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
        sqlInstance.contactsMaster.update(options,{where: {contact_id: options.contact_id}}).then(response => {
            if (response[0]> 0) {
                resolve({ message: 'Contact Details Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
        sqlInstance.emailMaster.update(options,{where: {email_id: options.email_id}}).then(response => {
            if (response[0]> 0) {
                resolve({ message: 'Email Details Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
        sqlInstance.kmMaster.update(options,{where: {km_id: options.km_id}}).then(response => {
            if (response[0]> 0) {
                resolve({ message: 'KM Master Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
        sqlInstance.stockMaster.update(options,{where: {stock_id: options.stock_id}}).then(response => {
            if (response[0]> 0) {
                resolve({ message: 'Stock Master Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
        sqlInstance.socialMediaMaster.update(options,{where: {social_id: options.social_id}}).then(response => {
            if (response[0]> 0) {
                resolve({ message: 'Social Media Links Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
        sqlInstance.notifyMaster.update(options,{where: {notify_id: options.notify_id}}).then(response => {
            if (response[0]> 0) {
                resolve({ message: 'Notification Master Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
            if (response[0]> 0) {
                resolve({ message: 'Merchandise Category Master Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
        sqlInstance.autolineColorMaster.findAll({where:{is_active:true}})
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
            if (response[0]> 0) {
                resolve({ message: 'Color Master Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
                resolve(result);
            } else {
                reject("something went worng..!");
            }
        })
        .catch(error =>{
            reject(error);
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
                    console.log('eee=> '+error);
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
            }).then((result) => {
                mapColorDetails(options.autoline_colors, options.color_id).then((result) => {
                    if (!_.isEmpty(result)) {
                        t.commit();
                        resolve(result);
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
            if (response[0]> 0) {
                resolve({ message: 'News Master Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
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
            where: { magazine_id: options.magazine_id }
        }).then(response => {
            if (response[0]> 0) {
                resolve({ message: 'Magazine Master Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
        }).catch(error => {
            reject(error);
        })
    });
}

/* Service Type Master */
/**
 * API To Insert Service Type Master Details to the Database
 * @param {string} service_type_english - Represents the name of service type in english.
 * @param {float} service_type_arabic - Represents the name of service type in arabic.
 * @param {bit} show_price - Represents the price status for show.
 * @return {object} - service type details
 */
master.addServiceTypeDetails = function (options) {
    return new Promise((resolve, reject) => {
        options.created_by = 1;//options.current_user_id;
        options.updated_by = 1;//options.current_user_id;
        global.sqlInstance.sequelize.models.service_type.findOrCreate({
            where: { service_type_english: options.service_type_english },
            defaults: options
        })
            .spread((service_type, created) => {
                if (created) {
                    return resolve(service_type);
                } else {
                    return resolve('service type already in use, retry with new.');
                }
            })
    });
}

/**
 * API To Update Service Type Master Details to the Database
 * @param {string} service_type_english - Represents the name of service type in english.
 * @param {float} service_type_arabic - Represents the name of service type in arabic.
 * @param {bit} show_price - Represents the price status for show.
 * @param {bit} is_active - Represents the status of data.
 * @return {object} - service type details
 */
master.updateServiceTypeDetails = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date(),
            options.updated_by = 1;//options.current_user_id
        global.sqlInstance.sequelize.models.service_type.update(options, {
            where: { service_type_id: options.service_type_id }
        })
        .then((response) => {
            if (response[0] > 0) {
                return resolve({ message: "service type update successfully" })
            } else {
                return resolve('Service Type does not exist')
            }
        })
        .catch((error) => {
            return reject(error)
        })
    });
}

/**
 * API To Get Service type Master Details from the Database
 * @param {string} search - Represents the search of the Response for Filter.
 * @param {bit} status - Represents the Status of the Response for Filter
 */
master.getServiceTypeLists = function (options) {
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
                        'service_type_english': { [Op.like]: '%' + search + '%' }
                    },
                        {
                            'service_type_arabic': { [Op.like]: '%' + search + '%' }
                        }
                    )
                };
                whereCondition[Op.and].push(orCondition, { is_active: status });
                Condition = whereCondition;
            }
        }
        global.sqlInstance.sequelize.models.service_type.findAll({ where: Condition })
            .then((response) => {
                return resolve(response);
            }).catch((error) => {

                return reject(error);
            });
    });
}

// Service Master
/**
 * API To Insert Service Master Details to the Database
 * @param {string} service_english - Represents the name of service type in english.
 * @param {float} service_arabic - Represents the name of service type in arabic.
 * @param {bit} price - Represents the price status for show.
 * @param {integer} service_type_id - Represents the service type.
 * @param {array} locations - Represents the location ids
 * @return {object} - service type details
 */
master.addServiceDetails = function (options) {
    return new Promise((resolve, reject) => {

            options.created_by = 1;//options.current_user_id;
            options.updated_by = 1;//options.current_user_id;
            return global.sqlInstance.sequelize.models.service_master.findOne({
                where: { service_english: options.service_english }
            })
                .then((service) => {
                    if (_.isEmpty(service)) {
                        let serviceDataObj = {};
                        serviceDataObj.service_english = options.service_english;
                        serviceDataObj.service_arabic = options.service_arabic;
                        serviceDataObj.price = options.price;
                        serviceDataObj.is_active = options.is_active;
                        serviceDataObj.service_type_id = options.service_type_id;
                        serviceDataObj.updated_by = 1;//options.current_user_id;
                        serviceDataObj.created_by = 1;//options.current_user_id;

                        return global.sqlInstance.sequelize.models.service_master.create(serviceDataObj)
                            .then((serviceData) => {
                                return insertServiceLocation(options.locations, serviceData.service_id).then((result) => {
                                    if (!_.isEmpty(result)) {
                                        return resolve("service create successfully");
                                    } else {
                                        return reject("something went worng in location creation");
                                    }
                                })
                                .catch((error) => {
                                    return reject(error);
                                })
                            })
                            .catch((error) => {
                                logger.error(util.format("Exception. %j", error))
                                return reject(error);
                            })
                    } else {
                        return resolve('service already in use, retry with new.');
                    }
                })

    });
}

// function for add locations of service
let insertServiceLocation = function (locations, service_id, finalResult = {}) {
    return new Promise((resolve, reject) => {
        let dataObj = {};
        if (locations.length > 0) {
            let object = locations.pop();
            dataObj.location_id = object.location_id;
            dataObj.service_id = service_id;
            global.sqlInstance.sequelize.models.service_to_location.create(dataObj)
                .then((response) => {
                    finalResult.result = response;
                    insertServiceLocation(locations, service_id, finalResult).then((result) => {
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
 * API To Update Service Master Details to the Database
 * @param {integer} service_id - Represents the service id.
 * @param {string} service_english - Represents the name of service in english.
 * @param {float} service_arabic - Represents the name of service in arabic.
 * @param {bit} price - Represents the price status for show.
 * @param {bit} is_active - Represents the status of data.
 * @param {array} locations - Represents the location ids
 * @return {object} - service type details
 */
master.updateServiceDetails = function (options) {

    return new Promise((resolve, reject) => {

        options.updated_at = new Date();
        options.updated_by = 1;//options.current_user_id
        global.sqlInstance.sequelize.models.service_master.update(options,{
            where:{service_id:options.service_id}
        })
        .then((response) => {
            if (response[0] > 0) {
                return updateServiceLocation(options.locations, options.service_id).then((result) => {
                    if (!_.isEmpty(result)) {
                        return resolve({message:"service update successfully"});
                    } else {
                        return reject("something went worng in location updation");
                    }
                })
                    .catch((error) => {
                        return reject(error);
                    })
            } else {
                return resolve('Service does not exist')
            }
        })
        .catch((error) => {
            return reject(error)
        })

    });
}

// function for update locations of service
let updateServiceLocation = function (locations, service_id, finalResult = {}) {
    return new Promise((resolve, reject) => {
        let dataObj = {};
        if (locations.length > 0) {
            let object = locations.pop();
            global.sqlInstance.sequelize.models.service_to_location.find({
                where: {
                    service_id: service_id,
                    location_id: object.prev_location_id
                }
            }).then(serviceLocationExist => {
                if (!_.isEmpty(serviceLocationExist)) {
                    dataObj.location_id = object.location_id
                    global.sqlInstance.sequelize.models.service_to_location.update({ location_id: object.location_id },
                        { where: { service_id: service_id, location_id: object.prev_location_id } }
                    )
                        .then((response) => {
                            finalResult.result = response;
                            updateServiceLocation(locations, service_id, finalResult).then((result) => {
                                resolve(result);
                            }).catch((error) => {
                                reject(error);
                            });
                        })
                        .catch((error) => {
                            return reject(error)
                        })
                } else {
                    return resolve('Service location does not exist')
                }
            })
        } else {
            resolve(finalResult);
        }
    });
}

/**
 * API To Get Service Master Details from the Database
 * @param {string} search - Represents the search of the Response for Filter.
 * @param {bit} status - Represents the Status of the Response for Filter
 * @param {integer} service_type_id - Represents the service type id for filter
 */
master.getServiceLists = function (options) {
    return new Promise((resolve, reject) => {
        let Condition ="";
        let { status, search,service_type_id } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition +='AND col.is_active =' +Number(status);
        }

        if (typeof search != 'undefined' && search != '') {
            Condition += "AND col.service_english LiKE '%"+search+"%'" ;
        }
        if (typeof service_type_id != 'undefined' && service_type_id != '') {
            Condition += "AND mst.service_type_id ="+service_type_id+"" ;
        }
        let query = "";
        query = "select  col.service_id, col.service_english as service_name,  mst.service_type_english,col.service_arabic, col.price, STUFF(( \n"
            +"SELECT ',' + atc.location_name \n"
            +"FROM master_location as atc \n"
            +"left join service_to_location as stl on stl.service_id = col.service_id \n"
            +"WHERE atc.location_id = stl.location_id \n"
            +"FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '') AS locations \n"
            +"from master_service AS col \n"
            +"join master_service_type as mst on mst.service_type_id = col.service_type_id \n"
            +"WHERE 1 = 1 \n"
            +Condition
            console.log("---->",query);
        global.sqlInstance.sequelize.query(query,{ type:  global.sqlInstance.sequelize.QueryTypes.SELECT}).then(function(users) {
                resolve(users);
          })
          .catch((error) => {
            logger.error(util.format("EXCEPTION FOR GET SERVICE LIST. %j",error))
             reject(error)
         })
       
    });
}

/* Autoline Status Master */
/**
 * API To Get Autoline Status Master Details from the Database
 */
master.getAutolineStatusList = () => {
    return new Promise((resolve, reject) => {
        sqlInstance.autolineStatusMaster.findAll({where:{is_active:true}})
        .then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}

/* CEM Status Master */
/**
 * API To Insert Status Master Details to the Database
 * @param {string} name - Represents the name of the Status.
 * @param {string} name_arabic - Represents the name of the Status in arabic
 * @param {number} sequence - Represents the sequence of the Status
 * @param {bit} is_active - Represents the Status of the Status
 */
master.addStatusDetail = (options) => {
    let statusObj = {};
    return new Promise((resolve, reject) => {
        return models.sequelize.transaction({autocommit: false}).then((t) => {
            statusObj.name = options.name;
            statusObj.is_active = options.is_active;
            sqlInstance.statusMaster.create(statusObj,{transaction:t}).then((result) => {
                mapStatusDetails(options.autoline_status, result.status_id).then((result) => {
                    if (!_.isEmpty(result)) {
                        t.commit();
                        resolve(result);
                    } else {
                        t.rollback();
                        reject("something went worng..!");
                    }
                })
                .catch(error => {
                    t.rollback();
                    reject(error);
                })
            })
            .catch((err) => {
                if (err.name === "SequelizeUniqueConstraintError") {
                    reject({ message: 'Status name should be unique' })
                } else {
                    reject(err);
                }
            });
        })
        .catch((err) => {
            reject(err);
        });
    });
}
let mapStatusDetails = function (autoline_status, status_id, finalResult = {}) {
    return new Promise((resolve, reject) => {
        let dataObj ={};
        if (autoline_status.length > 0) {
            let object = autoline_status.pop();
            dataObj.autoline_status_id = object.autoline_status_id;
            dataObj.status_id = status_id;
            console.log('recurssive loop=>');
            sqlInstance.autolineStatusMap.create(dataObj)
            .then((response) => {
                console.log('1737=>', response);
                finalResult.result = response;
                mapStatusDetails(autoline_status, status_id, finalResult).then((result) => {
                    resolve(result);
                }).catch((error) => {
                    console.log('map error=> '+error);
                    reject(error);
                });
            })
            .catch((error) => {
                console.log('eee=> '+error);
                reject(error);
            })
        } else {
            console.log('undefined');
            resolve(finalResult);
        }
    });
}
/**
 * API To Get Merchandise Category Master Details from the Database
 * @param {string} name - Represents the name of the Category for Filter.
 * @param {bit} is_active - Represents the Status of the Category for Filter
 */
master.getStatusList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = '';
        let { status, search } = options;
        if (typeof search != 'undefined' && search != '') {
            Condition += "and sta.name like '%" + search + "%'";
        }
        if (typeof status != 'undefined' && status != '') {
            Condition += 'and sta.is_active='+Number(status);
        }
        global.sqlInstance.sequelize.query("select  sta.status_id, sta.name as CEM_status, sta.name_arabic, sta.is_active, STUFF(("
            +"SELECT ',' + ats.name FROM autoline_status_master as ats "
            +"left join autoline_status_map as asm on asm.status_id = sta.status_id "
            +"WHERE ats.autoline_status_id = asm.autoline_status_id "
            +"FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '') AS autoline_status "
            +"from status_master AS sta where 1=1 "+Condition, {type: global.sqlInstance.sequelize.QueryTypes.SELECT})
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
master.updateStatusDetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        if(options.autoline_status != undefined && options.autoline_status.length > 0) {
            return models.sequelize.transaction({autocommit: false}).then((t) => {
                sqlInstance.statusMaster.update(options, {
                    where: {
                        status_id: options.status_id
                    },
                    transaction:t
                }).then((result) => {
                    sqlInstance.autolineStatusMap.destroy({
                        where: {
                            status_id: options.status_id
                        },
                        transaction: t
                    }).then(result => {
                        mapStatusDetails(options.autoline_status, options.status_id).then((result) => {
                            if (!_.isEmpty(result)) {
                                t.commit();
                                resolve(result);
                            } else {
                                t.rollback();
                                reject("something went worng..!");
                            }
                        }).catch(error => {
                            t.rollback();
                            reject(error);
                        })
                    }).catch(error => {
                        t.rollback();
                        reject(error);
                    })
                }).catch((err) => {
                    if (err.name === "SequelizeUniqueConstraintError") {
                        reject({ message: 'Status name should be unique' })
                    } else {
                        reject(err);
                    }
                });
            })
            .catch((err) => {
                console.log("error=> "+JSON.stringify(err));
                reject(err);
            });
        }
        else {
            sqlInstance.statusMaster.update(options, {
                where: { status_id: options.status_id }
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        }
    });
}

/* ON-OFF Status Master */
// API to Get Menu Items 
master.getSubMenuList = () => {
    return new Promise((resolve, reject) => {
        //sqlInstance.menu_item.findAll({where:{is_active:true}})
        global.sqlInstance.sequelize.query("select  sta.status_id, sta.name as CEM_status, sta.name_arabic, sta.is_active, STUFF(("
            +"SELECT ',' + ats.name FROM autoline_status_master as ats "
            +"left join autoline_status_map as asm on asm.status_id = sta.status_id "
            +"WHERE ats.autoline_status_id = asm.autoline_status_id "
            +"FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '') AS autoline_status "
            +"from status_master AS sta where 1=1 "+Condition, {type: global.sqlInstance.sequelize.QueryTypes.SELECT})
        .then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}

//API to Get Actions
master.getActionList = () => {
    return new Promise((resolve, reject) => {
        sqlInstance.actionMaster.findAll()
        .then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}

//Map Actions to Menu Items
master.addActionMapDetail = (options) => {
    return new Promise((resolve, reject) => {
        mapActionDetails(options.actions, options.menu_item_id).then((result) => {
            if (!_.isEmpty(result)) {
                resolve(result);
            } else {
                reject("something went worng..!");
            }
        })
        .catch(error =>{
            reject(error);
        })
    })
}

let mapActionDetails = function (actions, menu_item_id, finalResult = {}) {
    return new Promise((resolve, reject) => {
        let dataObj ={};
        if (actions.length > 0) {
            let object = actions.pop();
            dataObj.action_id = object.action_id;
            dataObj.menu_item_id = menu_item_id;
            sqlInstance.actionMap.create(dataObj)
                .then((response) => {
                    finalResult.result = response;
                    mapColorDetails(actions, menu_item_id, finalResult).then((result) => {
                        resolve(result);
                    }).catch((error) => {
                        reject(error);
                    });
                })
                .catch((error) => {
                    console.log('eee=> '+error);
                    reject(error);
                })
        } else {
           resolve(finalResult);
        }
    });
}

//Payment Matrix
/**
 * API To Insert Payment Matrix Master Details to the Database
 * @param {string} name - Represents the Notification name
 * @param {number} expiry - Represents the expiry time in hrs
 * @param {bit} is_active - Represents the status of the Lookup
 * @param {number} created_by - Represents the User Id for user who created lookup
 * @param {number} updated_by - Represents the User Id for user who updated lookup
 */
master.addPaymentMtrxDetails = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.paymentMatrixMaster.create(options).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error);
        })
    });
}
/**
 * API To Get Specifications Master Details to the Database
 * @param {string} name - Represents the Specification Name for Filter.
 * @param {number} specs_heading_id - Represents the Id of Specification Heading Master Type for Filter
 * @param {bit} is_active - Represents the Status of the Specification Heading for Filter
 */
master.getPaymentMtrxDetails = () => {
    return new Promise((resolve, reject) => {
        sqlInstance.paymentMatrixMaster.findAll({
            attributes: ['payment_mtrx_id', 'price', 'is_active'],
            include: [
                {
                    model: sqlInstance.areaMaster,
                    as: 'from_area_map',
                    attributes: ['name']
                },
                {
                    model: sqlInstance.areaMaster,
                    as: 'to_area_map',
                    attributes: ['name']
                }
            ]
        })
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
master.updatePaymentMtrxDetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        sqlInstance.paymentMatrixMaster.update(options, {
            where: { payment_mtrx_id: options.payment_mtrx_id }
        }).then(response => {
            if (response[0]> 0) {
                resolve({ message: 'Payment Matrix Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
        }).catch(error => {
            reject(error);
        })
    });
}

module.exports = master;