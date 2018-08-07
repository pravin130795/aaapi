const accessories = require('./accessories-model');
const common = require('../../utils/common');
const schemas = require('./accessories-schema');
const constants = require('../../utils/constants');

let getModelMasterForAccessories = function (req, res) {
    // Condition To Check that whether the User is Authenticated User or not.
    if (req.isAuthentiated()) {
        //API Call To Get the Model Master Details For Accessories
        accessories.getModelMasterForAccessories().then((modelMasterDetails) => {
            res.status(200).send({
                code: 2000,
                messageKey: constants.messageKeys.code_2000,
                data: modelMasterDetails
            });
        }).catch((error) => {
            return res.status(500).send({
                code: 5000,
                messageKey: constants.messageKeys.code_5000,
                data: error
            });
        });
    } else {
        return res.status(400).send({
            code: 4000,
            messageKey: constants.messageKeys.code_4000,
            data: {}
        });
    }
}

let getVariantDetailsFromMaster = function (req, res) {
    // Condition To Check that whether the User is Authenticated User or not.
    if (req.isAuthentiated()) {
        //To Sanitize the Request Data
        let data = common.sanitize(req.body, schemas.detailsForAccessories, constants.moduleNames.accessories);
        //Condition To Validate the Request Data
        if (schemas.validate(data, schemas.detailsForAccessories)) {
            //Function Call To Get the Variant Details Based on the Model ID.
            accessories.getVariantDetailsFromMaster(data).then((variantDetails) => {
                res.status(200).send({
                    code: 2000,
                    messageKey: constants.messageKeys.code_2000,
                    data: variantDetails
                });
            }).catch((error) => {
                return res.status(400).send({
                    code: 4000,
                    messageKey: constants.messageKeys.code_4000,
                    data: {}
                });
            });
        } else {
            // Incomplete Data
            return res.status(400).send({
                code: 4001,
                messageKey: constants.messageKeys.code_4001,
                data: {}
            });
        }
    } else {
        return res.status(400).send({
            code: 4000,
            messageKey: constants.messageKeys.code_4000,
            data: {}
        });
    }
}

let addAccessories = function (req, res) {
    // Condition To Check that whether the User is Authenticated User or not.
    if (req.isAuthentiated()) {
        // To Sanitize the Request Data
        let accessoriesData = common.sanitize(req.body, schemas.addAccessories, constants.moduleNames.accessories);
        //Condition To Validate the Request Data
        if (schemas.validate(accessoriesData, schemas.addAccessories)) {
            // Function Call To Add Accessories Data.
            accessories.addAccessories(accessoriesData).then((variantDetails) => {
                res.status(200).send({
                    code: 2000,
                    messageKey: constants.messageKeys.code_2000,
                    data: variantDetails
                });
            }).catch((error) => {
                return res.status(400).send({
                    code: 4000,
                    messageKey: constants.messageKeys.code_4000,
                    data: {}
                });
            });
        } else {
            // Incomplete Data
            return res.status(400).send({
                code: 4001,
                messageKey: constants.messageKeys.code_4001,
                data: {}
            });
        }
    } else {
        return res.status(400).send({
            code: 4000,
            messageKey: constants.messageKeys.code_4000,
            data: {}
        });
    }
}

module.exports = {
    getModelMasterForAccessories: getModelMasterForAccessories,
    getVariantDetailsFromMaster: getVariantDetailsFromMaster,
    addAccessories: addAccessories
}