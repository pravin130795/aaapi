const common = require('../../utils/common');
const schemas = require('../../validator/schemas');
const role = require('./role-model');
const constants = require('../../utils/constants');
const logger = require('../../utils/logger')


let addRole = function (req, res) {
    let roleData = common.sanitize(req.body, schemas.roleDetails);
    if (schemas.validate(roleData, schemas.roleDetails)) {
        role.addRoleDetail(roleData).then((response) => {
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

let updateRole = function (req, res) {
    role.updateRoleDetails(req.body).then((response) => {
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

let getRolesLists = function (req, res) {
    let filter = {
        search: req.query.search,
        status: req.query.status
    };
    role.getRoleLists(filter).then((response) => {
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
    addRole: addRole,
    getRolesLists: getRolesLists,
    updateRole: updateRole
}