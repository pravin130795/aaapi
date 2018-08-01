var util = require('util');
var Validator = require('jsonschema').Validator;
var logger = require('../utils/logger');
var constants = require('../utils/constants');
var _validator = new Validator();

var schemas = function () {
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

schemas.designationDetail = {
    'id': '/designationDetail',
    'type': 'object',
    'properties': {
        'designation_name': {
            'type': 'string',
            'required': true
        },
        'current_user_id': {
            'type': 'integer',
            'required': true
        },
    }
}

schemas.updateDesignationDetail = {
    'id': '/updateDesignationDetail',
    'type': 'object',
    'properties': {
        'designation_id': {
            'type': 'integer',
            'required': true
        },
        'designation_name': {
            'type': 'string',
            'required': true
        },
        'current_user_id': {
            'type': 'integer',
            'required': true
        }
    }
}

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
            'item':{
                '$ref': '/pageDetails',
            },
            'required': true
        }
    }
}

schemas.pageDetails = {
    'id': '/pageDetails',
    'type': 'object',
    'required': true,
    'properties': {
        'menu_item_id': {
            'type': 'integer',
            'required': true
        },
        'menu_item_name': {
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
        'report': {
            'type': 'bit',
            'required': true
        },
        'delete': {
            'type': 'bit',
            'required': true
        },
        'process_approval': {
            'type': 'bit',
            'required': true
        },
        'reject': {
            'type': 'bit',
            'required': true
        },
        'export': {
            'type': 'bit',
            'required': true
        }
    }
}


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
        'designation_id': {
            'type': 'integer',
            'required': true
        },
        'current_user_id': {
            'type': 'integer',
            'required': true
        },
    }
}

_validator.addSchema(schemas.addressDetails, '/addressDetails');
_validator.addSchema(schemas.pageDetails, '/pageDetails');

schemas.validate = function (object, schema) {
    var errors = _validator.validate(object, schema).errors;
    if (errors.length > 0) {
        logger.error(util.format('Schema validation failed for id:- %s errors:- %j', schema.id, errors));
    }
    return errors.length <= 0 ? true : false;
};

module.exports = schemas;