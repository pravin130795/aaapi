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
        'is_active': {
            'type': 'boolean',
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
        'is_active': {
            'type': 'boolean',
            'required': true
        },
    }
}

schemas.updateRoleDetails = {
    'id': '/roleDetails',
    'type': 'object',
    'properties': {
        'role_id': {
            'type': 'integer',
            'required': true
        },
        'role_name': {
            'type': 'string',
            'required': false
        },
        'role_description': {
            'type': 'string',
            'required': false
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        },
        'page_access': {
            'type': 'array',
            'item': {
                '$ref': '/updatePageDetails',
            },
            'required': false
        }
    }
}

schemas.updatePageDetails = {
    'id': '/updatePageDetails',
    'type': 'object',
    'properties': {
        'menu_item_id': {
            'type': 'string',
            'required': false
        },
        'view': {
            'type': 'bit',
            'required': false
        },
        'add': {
            'type': 'bit',
            'required': false
        },
        'edit': {
            'type': 'bit',
            'required': false
        },
        'delete': {
            'type': 'bit',
            'required': true
        },
        'report': {
            'type': 'bit',
            'required': false
        },
        'reject': {
            'type': 'bit',
            'required': false
        },
        'process_approval': {
            'type': 'bit',
            'required': false
        },
        'export': {
            'type': 'bit',
            'required': false
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        },
    }
}

schemas.roleMapUserDetails = {
    'id': '/roleMapUserDetails',
    'type': 'object',
    'properties': {
        'user_id': {
            'type': 'integer',
            'required': true
        },
        'roles': {
            'type': 'array',
            'item': {
                '$ref': '/roleIdDetails',
            },
            'required': true
        }
    }
}


schemas.roleIdDetails = {
    'id': '/roleIdDetails',
    'type': 'object',
    'properties': {
        'role_id': {
            'type': 'integer',
            'required': true
        }
    }
}


schemas.roleUserListDetails = {
    'id': '/roleUserListDetails',
    'type': 'object',
    'properties': {
        'user_id': {
            'type': 'integer',
            'required': true
        }
    }
}

_validator.addSchema(schemas.pageDetails, '/pageDetails');
_validator.addSchema(schemas.roleMapUserDetails, '/roleMapUserDetails');

schemas.validate = function (object, schema) {
    let errors = _validator.validate(object, schema).errors;
    if (errors.length > 0) {
        logger.error(util.format('Schema validation failed for id:- %s errors:- %j', schema.id, errors));
    }
    return errors.length <= 0 ? true : false;
};

module.exports = schemas;