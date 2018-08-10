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
    //console.log("------>",reqData)    
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

// let updateRole = function (req, res) {
//     let updateRoleData = common.sanitize(req.body, schemas.updateRoleDetails, constants.moduleNames.role);
//     if (schemas.validate(updateRoleData, schemas.updateRoleDetails)) {
//         role.updateRoleDetails(updateRoleData).then((response) => {
//             res.status(200).send({
//                 code: 2000,
//                 messageKey: constants.messageKeys.code_2000,
//                 data: response
//             });
//         }).catch((error) => {
//             logger.info(error);
//             return res.status(500).send({
//                 code: 5000,
//                 messageKey: constants.messageKeys.code_5000,
//                 data: error
//             });
//         });
//     } else {
//         // Incomplete Data
//         return res.status(400).send({
//             code: 4001,
//             messageKey: constants.messageKeys.code_4001,
//             data: {}
//         });
//     }
// }

// let getRolesLists = function (req, res) {
//     let filter = {
//         search: req.query.search,
//         status: req.query.status
//     };
//     role.getRoleLists(filter).then((response) => {
//         res.status(200).send({
//             code: 2000,
//             messageKey: constants.messageKeys.code_2000,
//             data: response
//         });
//     }).catch((error) => {
//         logger.info(error);
//         return res.status(500).send({
//             code: 5000,
//             messageKey: constants.messageKeys.code_5000,
//             data: error
//         });
//     });
// }


module.exports = {
    addMerchandise: addMerchandise,
    // getRolesLists: getRolesLists,
    // updateRole: updateRole
}