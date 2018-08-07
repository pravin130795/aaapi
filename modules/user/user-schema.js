const util = require('util');
const Validator = require('jsonschema').Validator;
const logger = require('../../utils/logger');
const _validator = new Validator();

let schemas = function () {
};

schemas.userLoginDetails = {
    'id': '/userLoginDetails',
    'type': 'object',
    'properties': {
        'user_name': {
            'type': 'string',
            'required': true
        },
        'password': {
            'type': 'string',
            'required': true
        }
    }
},

schemas.userDetails = {
    'id': '/userDetails',
    'type': 'object',
    'properties': {
        'user_name': {
            'type': 'string',
            'required': true
        },
        'email': {
            'type': 'string',
            'required': true
        },
        'password': {
            'type': 'string',
            'required': true
        },
        'mobile_no': {
            'type': 'string',
            'required': true
        },
        'approver_person': {
            'type': 'string',
            'required': true
        },
        'module_name': {
            'type': 'string',
            'required': true
        },
        'designation_id': {
            'type': 'integer',
            'required': true
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        }
    }
},

schemas.updateUserDetails = {
    'id': '/updateUserDetails',
    'type': 'object',
    'properties': {
        'user_id': {
            'type': 'integer',
            'required': true
        },
        'user_name': {
            'type': 'string',
            'required': true
        },
        'email': {
            'type': 'string',
            'required': true
        },
        'password': {
            'type': 'string',
            'required': true
        },
        'mobile_no': {
            'type': 'string',
            'required': true
        },
        'approver_person': {
            'type': 'string',
            'required': true
        },
        'module_name': {
            'type': 'string',
            'required': true
        },
        'designation_id': {
            'type': 'integer',
            'required': true
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        }
    }
}



schemas.validate = function (object, schema) {
    let errors = _validator.validate(object, schema).errors;
    if (errors.length > 0) {
        logger.error(util.format('Schema validation failed for id:- %s errors:- %j', schema.id, errors));
    }
    return errors.length <= 0 ? true : false;
};

module.exports = schemas;