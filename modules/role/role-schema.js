const util = require('util');
const Validator = require('jsonschema').Validator;
const logger = require('../../utils/logger');
const _validator = new Validator();

let schemas = function () {
};

schemas.roleDetails = {
    'id': '/roleDetails',
    'type': 'object',
    'properties': {
        'role_name': {
            'type': 'string',
            'required': true
        },
        'role_description': {
            'type': 'string',
            'required': true
        },
        'current_user_id': {
            'type': 'integer',
            'required': true
        },
        'page_access': {
            'type': 'array',
            'item': {
                '$ref': '/pageDetails',
            },
            'required': true
        }
    }
}

schemas.pageDetails = {
    'id': '/pageDetails',
    'type': 'object',
    'properties': {
        'menu_item_id': {
            'type': 'string',
            'required': true
        },
        'view': {
            'type': 'bit',
            'required': true
        },
        'add': {
            'type': 'bit',
            'required': true
        },
        'edit': {
            'type': 'bit',
            'required': true
        },
        'delete': {
            'type': 'bit',
            'required': true
        },
        'report': {
            'type': 'bit',
            'required': true
        },
        'reject': {
            'type': 'bit',
            'required': true
        },
        'process_approval': {
            'type': 'bit',
            'required': true
        },
        'export': {
            'type': 'bit',
            'required': true
        },
    }
}

_validator.addSchema(schemas.pageDetails, '/pageDetails');

schemas.validate = function (object, schema) {
    let errors = _validator.validate(object, schema).errors;
    if (errors.length > 0) {
        logger.error(util.format('Schema validation failed for id:- %s errors:- %j', schema.id, errors));
    }
    return errors.length <= 0 ? true : false;
};

module.exports = schemas;