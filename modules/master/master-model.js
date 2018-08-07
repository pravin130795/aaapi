const _ = require('lodash');
const async = require('async');
const util = require('util');
const Op = global.sqlInstance.sequelize.Op;
const logger = require('../../utils/logger');
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



/* Service Type Master */
/**
 * API To Insert Service Type Master Details to the Database
 * @param {string} service_type_english - Represents the name of service type in english.
 * @param {float} service_type_arabic - Represents the name of service type in arabic.
 * @param {bit} show_price - Represents the price status for show.
 * @param {integer} current_user_id - Represents the User Id for user who created Bank
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
 * @param {integer} current_user_id - Represents the User Id for user who created Bank
 * @return {object} - service type details
 */
master.updateServiceTypeDetails = function (options) {

    return new Promise((resolve, reject) => {
        global.sqlInstance.sequelize.models.service_type.findOne({
            where: {
                service_type_id: options.service_type_id
            }
        }).then(serviceTypeExist => {
            if (!_.isEmpty(serviceTypeExist)) {
                options.updated_at = new Date(),
                    options.updated_by = 1;//options.current_user_id
                serviceTypeExist.update(options)
                    .then((response) => {
                        return resolve(response)
                    })
                    .catch((error) => {
                        return reject(error)
                    })
            } else {
                return resolve('Service Type does not exist')
            }
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
        global.sqlInstance.sequelize.models.service_master.findOne({
            where: {
                service_id: options.service_id
            }
        }).then(serviceExist => {
            if (!_.isEmpty(serviceExist)) {
                options.updated_at = new Date();
                options.updated_by = 1;//options.current_user_id
                serviceExist.update(options)
                    .then((response) => {
                        return updateServiceLocation(options.locations, options.service_id).then((result) => {
                            if (!_.isEmpty(result)) {
                                return resolve("service update successfully");
                            } else {
                                return reject("something went worng in location updation");
                            }
                        })
                            .catch((error) => {
                                return reject(error);
                            })
                    })
                    .catch((error) => {
                        return reject(error)
                    })
            } else {
                return resolve('Service does not exist')
            }
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
            Condition +='col.is_active =' +Number(status);
        }else{
            Condition +="col.is_active =" +"''";
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
            +"WHERE "+Condition
        global.sqlInstance.sequelize.query(query,{ type:  global.sqlInstance.sequelize.QueryTypes.SELECT}).then(function(users) {
                resolve(users);
          })
          .catch((error) => {
            logger.error(util.format("EXCEPTION FOR GET SERVICE LIST. %j",error))
             reject(error)
         })
       
    });
}
module.exports = master;