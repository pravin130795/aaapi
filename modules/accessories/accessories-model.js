const util = require('util');
const logger = require('../../utils/logger');
const master = require('../master/master-model');
const sqlInstance = global.sqlInstance.sequelize.models;
const Op = global.sqlInstance.sequelize.Op;

let accessories = function () {
};

/**
 * Function To Get Model Master Details To add Accessories
 * @returns {object} modelMasterDetails - Holds the Master Details of Models. 
 * */
accessories.getModelMasterForAccessories = function () {
    return new Promise((resolve, reject) => {
        // Function Call To Get Model Masters Details
        master.getModelMaster().then((modelMasterDetails) => {
            logger.info(util.format("Model Master Fetched Successfully."));
            resolve(modelMasterDetails);
        }).catch((error) => {
            logger.error(util.format("Error While Fetching the Model Master Details. Error: %j", error));
            reject(error);
        });
    });
}

/**
 * Function To Get Variant Details Based on The Model Master Details
 * @param {number} modelId - Holds the Model ID For which variants are supposed to be fetched.
 * @param {number} variantYearFrom - Holds the Year From Which we need the Variants. Used For Filtering.
 * @param {number} variantYearTo - Holds the Year Till Which we need the Variants For Particular Model. Used For Filtering.
 * @returns {object} variantDetails - Holds the Variant Details
 *  */
accessories.getVariantDetailsFromMaster = function (data) {
    return new Promise((resolve, reject) => {
        //To Check The Model ID in Variant Master
        let searchObject = {
            model_id: data.modelId,
        }
        //Condition For Filtering Between Years. Request Parameter will have variantYearFrom and
        //variantYearTo, from that we will filter out the variants which are manufactred in between
        //of variantYearFrom and variantYearTo.
        if (data.variantYearFrom || data.variantYearTo) {
            searchObject['year'] = {};
            searchObject['year'][Op.and] = [];
            //Nested Condition To Check if variantYearFrom is not equal to undefined.
            //If not, we will filter this with variant manufacturing year.
            if (data.variantYearFrom) {
                searchObject['year'][Op.and].push({
                    [Op.gte]: data.variantYearFrom
                });
            }
            //Nested Condition To Check if variantYearTo is not equal to undefined.
            //If not, we will filter this with variant manufacturing year.
            if (data.variantYearTo) {
                searchObject['year'][Op.and].push({
                    [Op.lte]: data.variantYearTo
                });
            }
        }
        //Database Call To Fetch The Variant Details
        sqlInstance.variantMaster.findAll({
            where: searchObject,
            raw: true
        }).then((variantMasterDetails) => {
            resolve(variantMasterDetails);
        }).catch((error) => {
            reject(error);
        });
    });
}

/**
 * API to Add Accessories Details To Database
 * @param {object} accessoriesData - Holds the Accessories Data to be added to the database
 * @returns {boolean} status - Holds the Status of the insertion operation that is performed. If true, Success. If false, Failed */
accessories.addAccessories = function (accessoriesData) {
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}

module.exports = accessories;