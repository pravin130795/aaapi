const common = require('../../utils/common');
const schemas = require('./customer-schema');
const customer = require('./customer-model');
const constants = require('../../utils/constants');

let addCustomerDetails = function (req, res) {
    let customerData = common.sanitize(req.body, schemas.customerDetails);
    if (schemas.validate(customerData, schemas.customerDetails)) {
        customer.addCustomerDetails(customerData).then((response) => {
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
    addCustomerDetails: addCustomerDetails
}