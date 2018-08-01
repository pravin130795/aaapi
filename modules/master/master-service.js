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

let updateDesignation = function (req, res) {
    let updateDesignationData = common.sanitize(req.body, schemas.updateDesignationDetail);
    if (schemas.validate(updateDesignationData, schemas.updateDesignationDetail)) {
        master.updateDesignationDetail(updateDesignationData).then((response) => {
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

//Specification Heading Master
let addSpecsHeading = function (req, res) {
    let specsData = common.sanitize(req.body, schemas.specsHeading);
    if (schemas.validate(specsData, schemas.specsHeading)) {
        master.addSpecsHeadingDetail(specsData).then((response) => {
            res.status(200).send({
                code: 2000,
                messageKey: constants.messageKeys.code_2000,
                data: response
            });
        }).catch((error) => {
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
let getSpecsHeading = function (req, res) {
    let filter = {
        search : req.query.search,
        status : req.query.status
    };
    master.getSpecsHeadingLists(filter).then((response) => {
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
let updateSpecsHeading = function (req, res) {
    let specsData = req.body;
    if (schemas.validate(specsData, schemas.updateSpecsHeading)) {
        master.updateSpecsHeadingDetail(specsData).then((response) => {
            res.status(200).send({
                code: 2000,
                messageKey: constants.messageKeys.code_2000,
                data: response
            });
        }).catch((error) => {
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

//Specifications Master
let addSpecs = function (req, res) {
    let specsData = common.sanitize(req.body, schemas.specsDetails);
    if (schemas.validate(specsData, schemas.specsDetails)) {
        master.addSpecsDetail(specsData).then((response) => {
            res.status(200).send({
                code: 2000,
                messageKey: constants.messageKeys.code_2000,
                data: response
            });
        }).catch((error) => {
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
let getSpecs = function (req, res) {
    /* let filter = {
        search : req.query.search,
        status : req.query.status
    }; */
    master.getSpecificationDetails(req.query).then((response) => {
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
let updateSpecs = function (req, res) {
    let specsData = req.body;
    if (schemas.validate(specsData, schemas.updateSpecs)) {
        master.updateSpecsDetail(specsData).then((response) => {
            res.status(200).send({
                code: 2000,
                messageKey: constants.messageKeys.code_2000,
                data: response
            });
        }).catch((error) => {
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

//Year Master
let addYear = function (req, res) {
    let yearData = common.sanitize(req.body, schemas.addYears);
    if (schemas.validate(yearData, schemas.addYears)) {
        master.addYearDetail(yearData).then((response) => {
            res.status(200).send({
                code: 2000,
                messageKey: constants.messageKeys.code_2000,
                data: response
            });
        }).catch((error) => {
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
let getYear = function (req, res) {
    let filter = {
        year : req.query.year,
        status : req.query.status,
        type: req.query.type
    };
    master.getYearLists(filter).then((response) => {
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
let updateYear = function (req, res) {
    let yearData = req.body;
    if (schemas.validate(yearData, schemas.updateYear)) {
        master.updateYearDetail(yearData).then((response) => {
            res.status(200).send({
                code: 2000,
                messageKey: constants.messageKeys.code_2000,
                data: response
            });
        }).catch((error) => {
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

//Accessory Category Master
let addAccessoryCat = function (req, res) {
    let accessoryCatData = common.sanitize(req.body, schemas.accessoryCat);
    if (schemas.validate(accessoryCatData, schemas.accessoryCat)) {
        master.addAccessoryCategory(accessoryCatData).then((response) => {
            res.status(200).send({
                code: 2000,
                messageKey: constants.messageKeys.code_2000,
                data: response
            });
        }).catch((error) => {
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
let getAccessoryCat = function (req, res) {
    master.getAccessoryCatDetails(req.query).then((response) => {
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
let updateAccessoryCat = function (req, res) {
    let accessoryCatData = req.body;
    if (schemas.validate(accessoryCatData, schemas.updateAccessoryCat)) {
        master.updateAccessoryCategory(accessoryCatData).then((response) => {
            res.status(200).send({
                code: 2000,
                messageKey: constants.messageKeys.code_2000,
                data: response
            });
        }).catch((error) => {
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


/* Response Status Master */
let addResponseStatus = function (req, res) {
    let rspStatusData = common.sanitize(req.body, schemas.responseStatus);
    if (schemas.validate(rspStatusData, schemas.responseStatus)) {
        master.addResponseStatus(rspStatusData).then((response) => {
            res.status(200).send({
                code: 2000,
                messageKey: constants.messageKeys.code_2000,
                data: response
            });
        }).catch((error) => {
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
let getResponseStatus = function (req, res) {
    master.getResponseStatusList(req.query).then((response) => {
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
let updateResponseStatus = function (req, res) {
    let rspStatusData = req.body;
    if (schemas.validate(rspStatusData, schemas.updateResponseStatus)) {
        master.updateResponseStatus(rspStatusData).then((response) => {
            res.status(200).send({
                code: 2000,
                messageKey: constants.messageKeys.code_2000,
                data: response
            });
        }).catch((error) => {
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


module.exports = {
    addDesignation: addDesignation,
    getDesignation: getDesignation,
    updateDesignation: updateDesignation,
    addSpecsHeading: addSpecsHeading,
    getSpecsHeading: getSpecsHeading,
    updateSpecsHeading: updateSpecsHeading,
    addYear: addYear,
    getYear: getYear,
    updateYear: updateYear,
    addSpecs: addSpecs,
    getSpecs: getSpecs,
    updateSpecs: updateSpecs,
    addAccessoryCat: addAccessoryCat,
    getAccessoryCat: getAccessoryCat,
    updateAccessoryCat: updateAccessoryCat,
    addResponseStatus: addResponseStatus,
    getResponseStatus: getResponseStatus,
    updateResponseStatus: updateResponseStatus
}