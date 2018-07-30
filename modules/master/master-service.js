const common = require('../../utils/common');
const schemas = require('../../validator/schemas');
const master = require('./master-model');
const constants = require('../../utils/constants');
const logger = require('../../utils/logger')


let addDesignation = function (req, res) {
    let designationData = common.sanitize(req.body, schemas.designationDetail);
    if (schemas.validate(designationData, schemas.designationDetail)) {
        master.addDesignationDetail(designationData).then((response) => {
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
    } else {
        // Incomplete Data
        return res.status(400).send({
            code: 4001,
            messageKey: constants.messageKeys.code_4001,
            data: {}
        });
    }
}


let getDesignation = function (req, res) {
    let filter = {
        search : req.query.search,
        status : req.query.status
    };
    master.getDesignationLists(filter).then((response) => {
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
    addDesignation: addDesignation,
    getDesignation: getDesignation
}