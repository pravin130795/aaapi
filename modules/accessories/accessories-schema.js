const util = require('util');
const Validator = require('jsonschema').Validator;
const logger = require('../../utils/logger');
const _validator = new Validator();

let schemas = function () {
};

schemas.detailsForAccessories = {
    'id': '/detailsForAccessories',
    'type': 'object',
    'properties': {
        'modelId': {
            'type': 'number',
            'required': true
        },
        'variantYearFrom': {
            'type': 'number',
            'required': false
        },
        'variantYearTo': {
            'type': 'number',
            'required': false
        }
    }
}

schemas.addAccessories = {
    'id': '/detailsForAccessories',
    'type': 'object',
    'properties': {
        'accessoryId': {
            'type': 'number',
            'required': false
        },
        'cemId': {
            'type': 'number',
            'required': true,
        },
        'cemAccessoryName': {
            'type': 'string',
            'required': false,
        },
        'cemAccessoryArabicName': {
            'type': 'string',
            'required': false,
        },
        'price': {
            'type': 'number',
            'required': false
        },
        'autolineAccessoryId': {
            'type': 'number',
            'required': false
        },
        'autolineAccessoryName': {
            'type': 'string',
            'required': false
        },
        'partNumber': {
            'type': 'number',
            'required': false
        },
        'description': {
            'type': 'string',
            'required': false
        },
        'usp': {
            'type': 'string',
            'required': false
        },
        'fittingCompulsory': {
            'type': 'boolean',
            'required': true
        },
        'arabicDescription': {
            'type': 'string',
            'required': false
        },
        'arabicUsp': {
            'type': 'string',
            'required': false
        },
        'accessoriesImages': {
            'type': 'array',
            'items': {
                'type': 'object',
                '$ref': '/accessoriesImages',
            }
        },
        'mappingDetails': {
            'type': 'array',
            'items': {
                'type': 'object',
                '$ref': '/mappingArrayInfo'
            }
        }
    }
}

schemas.mappingArrayInfo = {
    'id': '/mappingArrayInfo',
    'type': 'object',
    'properties': {
        'modelId': {
            'type': 'number',
            'required': true
        },
        'variantId': {
            'type': 'number',
            'required': true
        },
        'fittingCharges': {
            'type': 'number',
            'required': false
        },
        'media': {
            'type': 'array',
            'items': {
                'type': 'object',
                '$ref': '/mediaInfo'
            }
        }
    }
}

schemas.mediaInfo = {
    'id': '/mediaInfo',
    'type': 'object',
    'properties': {
        'mediaData': {
            'type': 'string',
            'required': false
        },
        'mediaType': {
            'type': 'string',
            'required': false
        }
    }
}

schemas.accessoriesImages = {
    'id': '/accessoriesImages',
    'type': 'object',
    'properties': {
        'imageData': {
            'type': 'string',
            'required': false
        },
        'isDefaultImage': {
            'type': 'boolean',
            "required": false
        }
    }
}

_validator.addSchema(schemas.accessoriesImages, '/accessoriesImages');
_validator.addSchema(schemas.mappingArrayInfo, '/mappingArrayInfo');
_validator.addSchema(schemas.mediaInfo, '/mediaInfo');


schemas.validate = function (object, schema) {
    let errors = _validator.validate(object, schema).errors;
    if (errors.length > 0) {
        logger.error(util.format('Schema validation failed for id:- %s errors:- %j', schema.id, errors));
    }
    return errors.length <= 0 ? true : false;
};

module.exports = schemas;