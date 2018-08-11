const _ = require('lodash');
const common = require('../../utils/common');
const schemas = require('./merchandise-schema');
const merchandise = require('./merchandise-model');
const constants = require('../../utils/constants');
const logger = require('../../utils/logger')




let addMerchandise = function (req, res) {
    let reqData = {
        "data":req.body,
        "files":req.files
    };
    merchandise.addMerchandiseDetail(reqData).then((response) => {
        res.status(200).send({
            code: 2000,
            messageKey: constants.messageKeys.code_2000,
            data: response
        });
    }).catch((error) => {
        logger.info(error);
        return res.status(500).send({
            code: 5000,
            messageKey: constants.messageKeys.code_5000,
            data: error
        });
    });

}

let updateMerchandise = function (req, res) {
    let reqData = {
        "data": req.body,
        "files": req.files
    };
    merchandise.updateMerchandiseDetails(reqData).then((response) => {
        res.status(200).send({
            code: 2000,
            messageKey: constants.messageKeys.code_2000,
            data: response
        });
    }).catch((error) => {
        logger.info(error);
        return res.status(500).send({
            code: 5000,
            messageKey: constants.messageKeys.code_5000,
            data: error
        });
    });
}

let getMerchandiseLists = function (req, res) {
    let filter = {
        search: req.query.search,
        status: req.query.status
    };
    merchandise.getMerchandises(filter).then((response) => {
        res.status(200).send({
            code: 2000,
            messageKey: constants.messageKeys.code_2000,
            data: response
        });
    }).catch((error) => {
        logger.info(error);
        return res.status(500).send({
            code: 5000,
            messageKey: constants.messageKeys.code_5000,
            data: error
        });
    });
}

let mapCategory = function (req, res) {
    merchandise.mapCategoryToMerchandise(req.body).then((response) => {
        res.status(200).send({
            code: 2000,
            messageKey: constants.messageKeys.code_2000,
            data: response
        });
    }).catch((error) => {
        logger.info(error);
        return res.status(500).send({
            code: 5000,
            messageKey: constants.messageKeys.code_5000,
            data: error
        });
    });
}

module.exports = {
    addMerchandise: addMerchandise,
    getMerchandiseLists: getMerchandiseLists,
    updateMerchandise: updateMerchandise,
    mapCategory: mapCategory
}