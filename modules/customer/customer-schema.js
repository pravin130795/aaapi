const util = require('util');
const Validator = require('jsonschema').Validator;
const logger = require('../utils/logger');
const constants = require('../utils/constants');
const _validator = new Validator();

let schemas = function () {
};

schemas.customerDetails = {
    'id': '/customerDetails',
    'type': 'object',
    'properties': {
        'id': {
            'type': 'number',
            'required': true
        },
        'customerName': {
            'type': 'string',
            'required': true
        },
        'customerNumber': {
            'type': 'string',
            'required': true
        },
        'address': {
            'type': 'object',
            '$ref': '/addressDetails',
            'required': true
        },
        'contactNumbers': {
            'type': 'array',
            'items': {
                '$ref': 'contactNumbers'
            },
            'required': true
        }
    }
}

schemas.contactNumbers = {
    'id': 'contactNumbers',
    'type': 'object',
    'properties': {
        'homeNumber': {
            'type': 'String',
            'required': true
        }
    }
}

schemas.addressDetails = {
    'id': '/addressDetails',
    'type': 'object',
    'required': true,
    'properties': {
        'homeAddress': {
            'type': 'string',
            'required': true
        }
    }
}

_validator.addSchema(schemas.addressDetails, '/addressDetails');
_validator.addSchema(schemas.contactNumbers, '/contactNumbers');


schemas.validate = function (object, schema) {
    let errors = _validator.validate(object, schema).errors;
    if (errors.length > 0) {
        logger.error(util.format('Schema validation failed for id:- %s errors:- %j', schema.id, errors));
    }
    return errors.length <= 0 ? true : false;
};

module.exports = schemas;