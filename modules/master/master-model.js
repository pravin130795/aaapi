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
        options.created_by =1;
        global.sqlInstance.sequelize.models.designation.create(options).then((response) => {
            resolve("designation create successfully.")
        }).catch((error) => {
            if (error.name === "SequelizeUniqueConstraintError") {
                reject({ message: 'designation name should be unique' })
            } else {
                reject(error);
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
        let dataObj = {
            designation_name: options.designation_name,
            updated_at: new Date(),
            updated_by: 1,//options.current_user_id
            is_active: options.is_active
        };
        global.sqlInstance.sequelize.models.designation.update(dataObj, {
            where: { designation_id: options.designation_id }
        })
            .then(response => {
                if (response[0] > 0) {
                    resolve({ message: "designation update successfully" })
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
        global.sqlInstance.sequelize.models.designation.findAll({ 
            attributes:['designation_id','designation_name','is_active'],
            where: Condition 
        })
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
            resolve({ message: 'Specification heading details added successfully..!!' })
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
        sqlInstance.specsHeadingMaster.findAll({
            where: Condition,
            attributes: ['specs_heading_id', 'name', 'name_arabic', 'sequence', 'is_active']
        })
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
    let specsObj = {};
    return new Promise((resolve, reject) => {
        return models.sequelize.transaction().then((tran) => {
            specsObj.specs_heading_id = options.specs_heading_id;
            specsObj.name = options.name;
            specsObj.is_active = options.is_active;
            specsObj.is_model_overview = options.is_model_overview;
            specsObj.is_variant_overview = options.is_variant_overview;
            sqlInstance.specsMaster.create(specsObj,{transaction:tran}).then((result) => {
                mapValues(options.specs_values, result.specs_id, tran).then((result) => {
                    if (!_.isEmpty(result)) {
                        tran.commit();
                        resolve({ message: 'Specification Details added successfully..!!' });
                    } else {
                        tran.rollback();
                        reject("something went worng..!");
                    }
                })
                .catch(error => {
                    tran.rollback();
                    reject(error);
                })
            })
            .catch((err) => {
                if (err.name === "SequelizeUniqueConstraintError") {
                    reject({ message: 'Specification name should be unique' })
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
let mapValues = function (specs_values, specs_id, tran, finalResult = {}) {
    return new Promise((resolve, reject) => {
        let dataObj ={};
        if (specs_values.length > 0) {
            let object = specs_values.pop();
            dataObj.value = object.value;
            dataObj.value_arabic = object.value_arabic;
            dataObj.specs_id = specs_id;
            sqlInstance.specsValueMap.create(dataObj, { transaction: tran })
            .then((response) => {
                finalResult.result = response;
                mapValues(specs_values, specs_id, tran, finalResult).then((result) => {
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
 * API To Get Specifications Master Details from the Database
 * @param {string} name - Represents the Specification Name for Filter.
 * @param {number} specs_heading_id - Represents the Id of Specification Heading Master Type for Filter
 * @param {bit} is_active - Represents the Status of the Specification Heading for Filter
 */
master.getSpecificationDetails = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = '';
        let { status, search, heading } = options;
        if (typeof search != 'undefined' && search != '') {
            Condition += "and spm.name like '%" + search + "%'";
        }
        if (typeof status != 'undefined' && status != '') {
            Condition += 'and spm.is_active='+Number(status);
        }
        if (typeof heading != 'undefined' && heading != '') {
            Condition += 'and spm.specs_heading_id='+Number(heading);
        }
        global.sqlInstance.sequelize.query("select spm.specs_id, spm.name, sph.specs_heading_id, sph.name as heading_name, STUFF(( "
            +"SELECT ',' + svm.value "
            +"FROM specs_value_map as svm "
            +"WHERE svm.specs_id = spm.specs_id "
            +"FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '') AS specs_values, STUFF(( "
            +"SELECT ',' + svm.value_arabic "
            +"FROM specs_value_map as svm "
            +"WHERE svm.specs_id = spm.specs_id "
            +"FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '') AS specs_values_arabic, spm.is_model_overview, spm.is_variant_overview "
            +"from specification_master AS spm left join specification_heading as sph on sph.specs_heading_id = spm.specs_heading_id where 1=1 "+Condition, {type: global.sqlInstance.sequelize.QueryTypes.SELECT})
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
        if(options.specs_values != undefined && options.specs_values.length > 0) {
            return models.sequelize.transaction(/* {autocommit: false} */).then((tran) => {
                sqlInstance.specsMaster.update(options, {
                    where: {
                        specs_id: options.specs_id
                    },
                    transaction:tran
                }).then((result) => {
                    sqlInstance.specsValueMap.destroy({
                        where: {
                            specs_id: options.specs_id
                        },
                        transaction: tran
                    }).then(result => {
                        mapValues(options.specs_values, options.specs_id, tran).then((result) => {
                            if (!_.isEmpty(result)) {
                                tran.commit();
                                resolve(result);
                            } else {
                                tran.rollback();
                                reject("something went worng..!");
                            }
                        }).catch(error => {
                            tran.rollback();
                            reject(error);
                        })
                    }).catch(error => {
                        tran.rollback();
                        reject(error);
                    })
                }).catch((err) => {
                    if (err.name === "SequelizeUniqueConstraintError") {
                        reject({ message: 'Specification name should be unique' })
                    } else {
                        reject(err);
                    }
                });
            })
            .catch((err) => {
                reject(err);
            });
        }
        else {
            sqlInstance.specsMaster.update(options, {
                where: { specs_id: options.specs_id }
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        }
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
            resolve({ message: 'Year Detail added successfully..!!' })
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
        let { status, type, search } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof search != 'undefined' && search != '') {
            Condition['year'] = Number(search);
        }
        if (typeof type != 'undefined' && type != '') {
            Condition['type'] = { [Op.like]: '%' + type + '%' }
        }
        sqlInstance.yearMaster.findAll({ 
            where: Condition,
            attributes: ['year_id', 'year', 'type', 'is_active']
        })
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
            resolve({ message: 'Accessory category details added successfully..!!' })
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
        sqlInstance.accessoryCatMaster.findAll({ 
            where: Condition,
            attributes: ['accessory_cat_id', 'name', 'name_arabic', 'sequence', 'is_active']
        })
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
            resolve({ message: 'Response status details added successfully..!!' })
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
        sqlInstance.responseStatusMaster.findAll({ 
            where: Condition,
            attributes: ['rsp_status_id', 'status', 'comments', 'is_active']
        })
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
            resolve({ message: 'Area details added successfully..!!' })
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
        sqlInstance.areaMaster.findAll({
            where :Condition,
            attributes: ['area_id', 'name', 'type', 'is_active']
        })
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
            resolve({ message: 'BAnk EMI details added successfully..!!' })
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
        sqlInstance.bankMaster.findAll({ 
            where: Condition,
            attributes: ['bank_id', 'name', 'emi', 'is_active']
        })
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
            resolve({ message: 'Lookup details added successfully..!!' })
        }).catch(error => {
            reject(error);
        })
    });
}
/**
 * API To Get Lookup Master Details from the Database
 * @param {string} search - Represents the name of the Response for Filter.
 * @param {bit} status - Represents the Status of the Response for Filter
 */
master.getLookupList = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let {status, search } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof search != 'undefined' && search != '') {
            Condition['body_name'] = { [Op.like]: '%' + search + '%' };
        }
        sqlInstance.lookupMaster.findAll({
            where :Condition,
            attributes: ['lookup_id', 'body_name', 'type', 'is_active']
        })
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
            resolve({ message: 'From to price details added successfully..!!' })
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
        sqlInstance.fromToPriceMaster.findAll({
            where :Condition,
            attributes: ['from_to_price_id', 'from_price', 'to_price', 'type', 'is_active']
        })
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
        sqlInstance.contactsMaster.findAll({
            where :Condition,
            attributes: ['contact_id', 'module_name', 'contact_no']
        })
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
        sqlInstance.emailMaster.findAll({
            where :Condition,
            attributes: ['email_id', 'module_name', 'emp_name', 'email', 'contact_no', 'is_active']
        })
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
            resolve({ message: 'KM Detail added successfully..!!' })
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
        sqlInstance.kmMaster.findAll({
            where :Condition,
            attributes: ['km_id', 'km_value', 'is_active']
        })
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
        sqlInstance.stockMaster.findAll({
            where :Condition,
            attributes: ['stock_id', 'is_variant', 'current_id', 'stock', 'limit', 'range']
        })
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
            resolve({ message: 'Social media link details added successfully..!!' })
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
        sqlInstance.socialMediaMaster.findAll({
            where :Condition,
            attributes: ['social_id', 'name', 'url', 'is_active']
        })
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
            resolve({ message: 'Notification expiry details added successfully..!!' })
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
        sqlInstance.notifyMaster.findAll({
            where :Condition,
            attributes: ['notify_id', 'name', 'expiry', 'is_active']
        })
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
            resolve({ message: 'Merchandise category details added successfully..!!' })
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
        sqlInstance.merchandiseCatMaster.findAll({ 
            where: Condition,
            attributes: ['merchandise_cat_id', 'name', 'name_arabic', 'sequence', 'is_active']
        })
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
        sqlInstance.autolineColorMaster.findAll({
            where:{is_active:true},
            attributes: ['autoline_color_id', 'name', 'color_code', 'is_active']
        })
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
            resolve({ message: 'Color details added successfully..!!' })
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
                resolve({ message: 'Color mapping done successfully..!!' });
            } else {
                reject("something went worng..!");
            }
        })
        .catch(error =>{
            reject(error);
        })
    })
}

let mapColorDetails = function (autoline_colors, color_id, finalResult = {}, tran) {
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
 * API To Update Color Map Details to the Database
 * @param {number} merchandise_cat_id - Represents the Id of the Category
 * @param {string} name - Represents the name of the Category.
 * @param {string} name_arabic - Represents the name of the Category in arabic
 * @param {number} sequence - Represents the sequence of the Category
 * @param {bit} is_active - Represents the Status of the Category
 */
master.updateColorMapDetail = function (options) {
    return new Promise((resolve, reject) => {
        return models.sequelize.transaction(/* {autocommit: false} */).then((tran) => {
            return sqlInstance.autolineColorMap.destroy({
                where: {
                    color_id: options.color_id
                },
                transaction: tran
            }).then((result) => {
                updateColorMap(options.autoline_colors, options.color_id, tran).then((result) => {
                    if (!_.isEmpty(result)) {
                        tran.commit();
                        resolve({ message: 'Color map updated successfully..!!' });
                    } else {
                        tran.rollback();
                        reject({ message: "something went worng..!"});
                    }
                })
                .catch(error => {
                    tran.rollback();
                    reject(error);
                })
            }).catch((err) => {
                reject(err);
            });
        });
    });
}
let updateColorMap = function (autoline_colors, color_id, tran, finalResult = {}) {
    return new Promise((resolve, reject) => {
        let dataObj ={};
        if (autoline_colors.length > 0) {
            let object = autoline_colors.pop();
            dataObj.autoline_color_id = object.autoline_color_id;
            dataObj.color_id = color_id;
            sqlInstance.autolineColorMap.create(dataObj, {transaction: tran})
                .then((response) => {
                    finalResult.result = response;
                    updateColorMap(autoline_colors, color_id, tran, finalResult).then((result) => {
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
            resolve({ message: 'News details added successfully..!!' })
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
        sqlInstance.newsMaster.findAll({ 
            where: Condition,
            attributes: ['news_id', 'name', 'description', 'url', 'update_date', 'start_date', 'end_date', 'is_approved', 'is_active']
        })
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
            resolve({ message: 'Magazine details added successfully..!!' })
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
        sqlInstance.magazineMaster.findAll({
            where: Condition,
            attributes: ['magazine_id', 'name', 'name_arabic', 'description', 'description_arabic', 'upload_date', 'start_date', 'end_date', 'file_type', 'is_approved', 'is_active']
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
        global.sqlInstance.sequelize.models.service_type.create(options).then(response => {
            resolve("service type create successfully")
        }).catch(error => {
            if (error.name === "SequelizeUniqueConstraintError") {
                resolve({ message: 'srvice type name should be unique' })
            } else {
                reject(error);
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
        global.sqlInstance.sequelize.models.service_type.findAll({ 
            attributes:['service_type_id','service_type_english','service_type_arabic','show_price','is_active'],
            where: Condition 
        })
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
        return models.sequelize.transaction().then((tran) => {
            let serviceDataObj = {};
            serviceDataObj.service_english = options.service_english;
            serviceDataObj.service_arabic = options.service_arabic;
            serviceDataObj.price = options.price;
            serviceDataObj.is_active = options.is_active;
            serviceDataObj.service_type_id = options.service_type_id;
            serviceDataObj.updated_by = 1;//options.current_user_id;
            serviceDataObj.created_by = 1;//options.current_user_id;
    
            return global.sqlInstance.sequelize.models.service_master.create(serviceDataObj,{ transaction:tran })
                .then((serviceData) => {
                    return insertServiceLocation(options.locations, serviceData.service_id, tran).then((result) => {
                        if (!_.isEmpty(result)) {
                            tran.commit();
                            return resolve("service create successfully");
                        } else {
                            tran.rollback();
                            return reject("something went worng in location creation");
                        }
                    })
                    .catch((error) => {
                        tran.rollback();
                        return reject(error);
                    })
                })
                .catch((error) => {
                    tran.rollback();
                    if (error.name === "SequelizeUniqueConstraintError") {
                        logger.error(util.format("Exception. %j", error))
                        resolve({ message: 'srvice name should be unique' })
                    } else {
                        reject(error);
                    }
                })
        })
        .catch((error) => {
            reject(error);
        })
    });
}

// function for add locations of service
let insertServiceLocation = function (locations, service_id, tran,finalResult = {}) {
    return new Promise((resolve, reject) => {
        let dataObj = {};
        if (locations.length > 0) {
            let object = locations.pop();
            dataObj.location_id = object.location_id;
            dataObj.service_id = service_id;
            global.sqlInstance.sequelize.models.service_to_location.create(dataObj,{ transaction:tran })
                .then((response) => {
                    finalResult.result = response;
                    insertServiceLocation(locations, service_id,tran ,finalResult).then((result) => {
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
        return models.sequelize.transaction().then((tran) => {
            options.updated_at = new Date();
            options.updated_by = 1;//options.current_user_id
            global.sqlInstance.sequelize.models.service_master.update(options,
                {where:{service_id:options.service_id}},{ transaction:tran })
            .then((response) => {
                if (response[0] > 0) {
                    return updateServiceLocation(options.locations, options.service_id, tran).then((result) => {
                        if (!_.isEmpty(result)) {
                            tran.commit();
                             resolve({message:"service update successfully"});
                        } else {
                            tran.rollback();
                             reject("something went worng in location updation");
                        }
                    })
                    .catch((error) => {
                        tran.rollback();
                        reject(error);
                    })
                } else {
                     resolve('Service does not exist')
                }
            })
            .catch((error) => {
                 reject(error)
            })
        })
        .catch((error) => {
            reject(error);
        })
    });
}

// function for update locations of service
let updateServiceLocation = function (locations, service_id,tran, finalResult = {}) {
    return new Promise((resolve, reject) => {
        let dataObj = {};
        if (locations.length > 0) {
            let object = locations.pop();
            global.sqlInstance.sequelize.models.service_to_location.findOne({
                where: {
                    service_id: service_id,
                    location_id: object.prev_location_id
                }
            }).then(serviceLocationExist => {
                if (!_.isEmpty(serviceLocationExist)) {
                    dataObj.location_id = object.location_id
                   return global.sqlInstance.sequelize.models.service_to_location.update(dataObj,
                        { where: { service_id: service_id, location_id: object.prev_location_id } },{ transaction:tran })
                        .then((response) => {
                            if (response[0] > 0) {
                                finalResult.result = response;
                                updateServiceLocation(locations, service_id, tran,finalResult).then((result) => {
                                    resolve(result);
                                }).catch((error) => {
                                    reject(error);
                                });     
                            } else {
                                return resolve('location does not exist')
                            }
                        })
                        .catch((error) => {
                             reject(error)
                        })
                } else {
                     resolve('Service location does not exist')
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
            //console.log("---->",query);
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
        return models.sequelize.transaction().then((tran) => {
            statusObj.name = options.name;
            statusObj.is_active = options.is_active;
            sqlInstance.statusMaster.create(statusObj,{transaction:tran}).then((result) => {
                mapStatusDetails(options.autoline_status, result.status_id, tran).then((result) => {
                    if (!_.isEmpty(result)) {
                        tran.commit();
                        resolve({ message: 'Status details added successfully..!!' });
                    } else {
                        tran.rollback();
                        reject("something went worng..!");
                    }
                })
                .catch(error => {
                    tran.rollback();
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
let mapStatusDetails = function (autoline_status, status_id, tran, finalResult = {}) {
    return new Promise((resolve, reject) => {
        let dataObj ={};
        if (autoline_status.length > 0) {
            let object = autoline_status.pop();
            dataObj.autoline_status_id = object.autoline_status_id;
            dataObj.status_id = status_id;
            console.log('recurssive loop=>');
            sqlInstance.autolineStatusMap.create(dataObj,{transaction:tran})
            .then((response) => {
                console.log('1737=>', response);
                finalResult.result = response;
                mapStatusDetails(autoline_status, status_id, tran, finalResult).then((result) => {
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
            return models.sequelize.transaction().then((tran) => {
                sqlInstance.statusMaster.update(options, {
                    where: {
                        status_id: options.status_id
                    },
                    transaction:tran
                }).then((result) => {
                    sqlInstance.autolineStatusMap.destroy({
                        where: {
                            status_id: options.status_id
                        },
                        transaction: tran
                    }).then(result => {
                        mapStatusDetails(options.autoline_status, options.status_id, tran).then((result) => {
                            if (!_.isEmpty(result)) {
                                tran.commit();
                                resolve({ message: 'Status details updated successfully..!!' });
                            } else {
                                tran.rollback();
                                reject("something went worng..!");
                            }
                        }).catch(error => {
                            tran.rollback();
                            reject(error);
                        })
                    }).catch(error => {
                        tran.rollback();
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
                resolve({ message: 'Status details updated successfully..!!' });
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
                resolve({ message: 'Action details mapped successfully..!!' });
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
            resolve({ message: 'Payment matrix details added successfully..!!' })
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

//CPOV Specification Master
/**
 * API To Insert CPOV Specification Master Details to the Database
 * @param {string} name - Represents the Notification name
 * @param {number} expiry - Represents the expiry time in hrs
 * @param {bit} is_active - Represents the status of the Lookup
 * @param {number} created_by - Represents the User Id for user who created lookup
 * @param {number} updated_by - Represents the User Id for user who updated lookup
 */
master.addCpovSpecsDetails = (options) => {
    let specsObj = {};
    return new Promise((resolve, reject) => {
        return models.sequelize.transaction().then((tran) => {
            specsObj.name = options.name;
            specsObj.is_active = options.is_active;
            sqlInstance.cpovSpecsMaster.create(specsObj,{transaction:tran}).then((result) => {
                cpovMapValues(options.specs_values, result.cpov_specs_id, tran).then((result) => {
                    if (!_.isEmpty(result)) {
                        tran.commit();
                        resolve({ message: 'CPOV specification details added successfully..!!' });
                    } else {
                        tran.rollback();
                        reject("something went worng..!");
                    }
                })
                .catch(error => {
                    tran.rollback();
                    reject(error);
                })
            })
            .catch((err) => {
                if (err.name === "SequelizeUniqueConstraintError") {
                    reject({ message: 'Specification name should be unique' })
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
let cpovMapValues = function (specs_values, cpov_specs_id, tran, finalResult = {}) {
    return new Promise((resolve, reject) => {
        let dataObj ={};
        if (specs_values.length > 0) {
            let object = specs_values.pop();
            dataObj.value = object.value;
            dataObj.value_arabic = object.value_arabic;
            dataObj.cpov_specs_id = cpov_specs_id;
            sqlInstance.cpovSpecsValueMap.create(dataObj, { transaction: tran })
            .then((response) => {
                finalResult.result = response;
                cpovMapValues(specs_values, cpov_specs_id, tran, finalResult).then((result) => {
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
 * API To Get Specifications Master Details to the Database
 * @param {string} name - Represents the Specification Name for Filter.
 * @param {number} specs_heading_id - Represents the Id of Specification Heading Master Type for Filter
 * @param {bit} is_active - Represents the Status of the Specification Heading for Filter
 */
master.getCpovSpecsDetails = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = '';
        let { status, search } = options;
        if (typeof search != 'undefined' && search != '') {
            Condition += "and spm.name like '%" + search + "%'";
        }
        if (typeof status != 'undefined' && status != '') {
            Condition += 'and spm.is_active='+Number(status);
        }
        global.sqlInstance.sequelize.query("select spm.cpov_specs_id, spm.name, STUFF(( "
            +"SELECT ', ' + svm.value "
            +"FROM cpov_specs_value_map as svm "
            +"WHERE svm.cpov_specs_id = spm.cpov_specs_id "
            +"FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '') AS specs_values, STUFF(( "
            +"SELECT ', ' + svm.value_arabic "
            +"FROM cpov_specs_value_map as svm "
            +"WHERE svm.cpov_specs_id = spm.cpov_specs_id "
            +"FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '') AS specs_values_arabic "
            +"from cpov_specs_master AS spm where 1=1 "+Condition, {type: global.sqlInstance.sequelize.QueryTypes.SELECT})
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
master.updateCpovSpecsDetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        if(options.specs_values != undefined && options.specs_values.length > 0) {
            return models.sequelize.transaction().then((tran) => {
                sqlInstance.cpovSpecsMaster.update(options, {
                    where: {
                        cpov_specs_id: options.cpov_specs_id
                    },
                    transaction:tran
                }).then((result) => {
                    sqlInstance.cpovSpecsValueMap.destroy({
                        where: {
                            cpov_specs_id: options.cpov_specs_id
                        },
                        transaction: tran
                    }).then(result => {
                        cpovMapValues(options.specs_values, options.cpov_specs_id, tran).then((result) => {
                            if (!_.isEmpty(result)) {
                                tran.commit();
                                resolve({ message: 'CPOV Specifications Updated successfully..!!' });
                            } else {
                                tran.rollback();
                                reject("something went worng..!");
                            }
                        }).catch(error => {
                            tran.rollback();
                            reject(error);
                        })
                    }).catch(error => {
                        tran.rollback();
                        reject(error);
                    })
                }).catch((err) => {
                    if (err.name === "SequelizeUniqueConstraintError") {
                        reject({ message: 'CPOV Specification name should be unique' })
                    } else {
                        reject(err);
                    }
                });
            })
            .catch((err) => {
                reject(err);
            });
        }
        else {
            sqlInstance.cpovSpecsMaster.update(options, {
                where: { specs_id: options.specs_id }
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        }
    });
}

//FAQ Type Master
/**
 * API To Insert FAQ Type Master Details to the Database
 * @param {string} name - Represents the Notification name
 * @param {number} expiry - Represents the expiry time in hrs
 * @param {bit} is_active - Represents the status of the Lookup
 * @param {number} created_by - Represents the User Id for user who created lookup
 * @param {number} updated_by - Represents the User Id for user who updated lookup
 */
master.addFaqTypeDetails = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.faqTypeMaster.create(options).then(response => {
            resolve({ message: 'FAQ type details added successfully..!!' })
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
master.getFaqTypeDetails = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { status, search } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof search != 'undefined' && search != '') {
            Condition['name'] = { [Op.like]: '%' + search + '%' };
        }
        sqlInstance.faqTypeMaster.findAll({
            where: Condition,
            attributes: ['faq_type_id', 'name', 'is_active']
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
master.updateFaqTypeDetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        sqlInstance.faqTypeMaster.update(options, {
            where: { faq_type_id: options.faq_type_id }
        }).then(response => {
            if (response[0]> 0) {
                resolve({ message: 'FAQ Type Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
        }).catch(error => {
            reject(error);
        })
    });
}

//FAQ Master
/**
 * API To Insert FAQ Type Master Details to the Database
 * @param {string} name - Represents the Notification name
 * @param {number} expiry - Represents the expiry time in hrs
 * @param {bit} is_active - Represents the status of the Lookup
 * @param {number} created_by - Represents the User Id for user who created lookup
 * @param {number} updated_by - Represents the User Id for user who updated lookup
 */
master.addFaqDetails = (options) => {
    return new Promise((resolve, reject) => {
        sqlInstance.faqMaster.create(options).then(response => {
            resolve({ message: 'FAQ details added successfully..!!' })
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
master.getFaqDetails = (options) => {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { status, search } = options;
        if (typeof status != 'undefined' && status != '') {
            Condition['is_active'] = Number(status);
        }
        if (typeof search != 'undefined' && search != '') {
            Condition['qstn'] = { [Op.like]: '%' + search + '%' };
        }
        sqlInstance.faqMaster.findAll({
            where: Condition,
            attributes: ['faq_id', 'qstn', 'answer', 'is_active', 'is_approved'],
            include: [
                {
                    model: sqlInstance.faqTypeMaster,
                    as: 'qstn_type',
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
master.updateFaqDetail = function (options) {
    return new Promise((resolve, reject) => {
        options.updated_at = new Date();
        sqlInstance.faqMaster.update(options, {
            where: { faq_id: options.faq_id }
        }).then(response => {
            if (response[0]> 0) {
                resolve({ message: 'FAQ  Updated successfully..!!' });
            } else {
                resolve({ message: 'Row does not exist' });
            }
        }).catch(error => {
            reject(error);
        })
    });
}


module.exports = master;