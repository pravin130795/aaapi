const common = require('../../utils/common');
const schemas = require('./master-schema');
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
        search: req.query.search,
        status: req.query.status
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
        search: req.query.search,
        status: req.query.status
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
        year: req.query.year,
        status: req.query.status,
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

/* Area Master */
let addArea = (req, res) => {
    let areaData = common.sanitize(req.body, schemas.areaMaster);
    if (schemas.validate(areaData, schemas.areaMaster)) {
        master.addAreaDetails(areaData).then((response) => {
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
let getArea = function (req, res) {
    master.getAreaList(req.query).then((response) => {
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
let updateArea = function (req, res) {
    let areaData = req.body;
    if (schemas.validate(areaData, schemas.updateAreaRqst)) {
        master.updateAreaDetail(areaData).then((response) => {
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


/* Lookup Master */
let addLookup = (req, res) => {
    let lookupData = common.sanitize(req.body, schemas.addLookupRqst);
    if (schemas.validate(lookupData, schemas.addLookupRqst)) {
        master.addLookupDetails(lookupData).then((response) => {
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
let getLookup = function (req, res) {
    master.getLookupList(req.query).then((response) => {
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
let updateLookup = function (req, res) {
    let lookupData = req.body;
    if (schemas.validate(lookupData, schemas.updateLookupRqst)) {
        master.updateLookupdetail(lookupData).then((response) => {
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

/* From To Price */
let addFromToPrice = (req, res) => {
    let fromToPriceData = common.sanitize(req.body, schemas.addFromToPriceRqst);
    if (schemas.validate(fromToPriceData, schemas.addFromToPriceRqst)) {
        master.addFromToPriceDetails(fromToPriceData).then((response) => {
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
let getFromToPrice = function (req, res) {
    master.getFromToPriceList(req.query).then((response) => {
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
let updateFromToPrice = function (req, res) {
    let lookupData = req.body;
    if (schemas.validate(lookupData, schemas.updateFromToPriceRqst)) {
        master.updateFromToPriceDetail(lookupData).then((response) => {
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

/* Contacts Master */
let getContacts = function (req, res) {
    master.getContactsList(req.query).then((response) => {
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
let updateContacts = function (req, res) {
    let contactsData = req.body;
    if (schemas.validate(contactsData, schemas.updateContactsRqst)) {
        master.updateContactDetail(contactsData).then((response) => {
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

/* Contacts Master */
let getEmailDetail = function (req, res) {
    master.getEmailsList(req.query).then((response) => {
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
let updateEmailDetails = function (req, res) {
    let emailData = req.body;
    if (schemas.validate(emailData, schemas.updateEmailRqst)) {
        master.updateEmailDetail(emailData).then((response) => {
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

/* Km master */
let addKmMaster = (req, res) => {
    let kmData = common.sanitize(req.body, schemas.addKmRqst);
    if (schemas.validate(kmData, schemas.addKmRqst)) {
        master.addKmDetails(kmData).then((response) => {
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
let getKmMaster = function (req, res) {
    master.getKmList(req.query).then((response) => {
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
let updateKmMaster = function (req, res) {
    let kmData = req.body;
    if (schemas.validate(kmData, schemas.updateKmRqst)) {
        master.updateKmDetail(kmData).then((response) => {
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

/* Contacts Master */
let getStockDetails = function (req, res) {
    master.getStockList(req.query).then((response) => {
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
let updateStockDetails = function (req, res) {
    let stockData = req.body;
    if (schemas.validate(stockData, schemas.updateStockRqst)) {
        master.updateStockDetail(stockData).then((response) => {
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

/* Social Media Master */
let addSocialLinks = (req, res) => {
    let socialData = common.sanitize(req.body, schemas.addSocialRqst);
    if (schemas.validate(socialData, schemas.addSocialRqst)) {
        master.addSocialDetails(socialData).then((response) => {
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
let getSocialLinks = function (req, res) {
    master.getSocialList(req.query).then((response) => {
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
let updateSocialLinks = function (req, res) {
    let socialData = req.body;
    if (schemas.validate(socialData, schemas.updateSocialRqst)) {
        master.updateSocialDetail(socialData).then((response) => {
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

/* Notifications Master */
let addNotification = (req, res) => {
    let notifyData = common.sanitize(req.body, schemas.addNotifyRqst);
    if (schemas.validate(notifyData, schemas.addNotifyRqst)) {
        master.addNotifyDetails(notifyData).then((response) => {
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
let getNotification = function (req, res) {
    master.getNotifyList(req.query).then((response) => {
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
let updateNotification = function (req, res) {
    let notifyData = req.body;
    if (schemas.validate(notifyData, schemas.updateNotifyRqst)) {
        master.updateNotifyDetail(notifyData).then((response) => {
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
let addMerchandiseCat = function (req, res) {
    let merchandiseCatData = common.sanitize(req.body, schemas.addMerchandiseCatRqst);
    if (schemas.validate(merchandiseCatData, schemas.addMerchandiseCatRqst)) {
        master.addMerchandiseCategory(merchandiseCatData).then((response) => {
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
let getMerchandiseCat = function (req, res) {
    master.getMerchandiseCatDetails(req.query).then((response) => {
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
let updateMerchandiseCat = function (req, res) {
    let merchandiseCatData = req.body;
    if (schemas.validate(merchandiseCatData, schemas.updateMerchandiseCatRqst)) {
        master.updateMerchandiseCategory(merchandiseCatData).then((response) => {
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
    updateResponseStatus: updateResponseStatus,
    addArea: addArea,
    getArea: getArea,
    updateArea: updateArea,
    addLookup: addLookup,
    getLookup: getLookup,
    updateLookup: updateLookup,
    addFromToPrice: addFromToPrice,
    getFromToPrice: getFromToPrice,
    updateFromToPrice: updateFromToPrice,
    getContacts: getContacts,
    updateContacts: updateContacts,
    getEmailDetail: getEmailDetail,
    updateEmailDetails: updateEmailDetails,
    addKmMaster: addKmMaster,
    getKmMaster: getKmMaster,
    updateKmMaster: updateKmMaster,
    getStockDetails: getStockDetails,
    updateStockDetails: updateStockDetails,
    addSocialLinks: addSocialLinks,
    getSocialLinks: getSocialLinks,
    updateSocialLinks: updateSocialLinks,
    addNotification: addNotification,
    getNotification: getNotification,
    updateNotification: updateNotification,
    addMerchandiseCat: addMerchandiseCat,
    getMerchandiseCat: getMerchandiseCat,
    updateMerchandiseCat: updateMerchandiseCat
}