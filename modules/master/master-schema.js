const util = require('util');
const Validator = require('jsonschema').Validator;
const logger = require('../../utils/logger');
const _validator = new Validator();

let schemas = function () {
};

schemas.designationDetail = {
    'id': '/designationDetail',
    'type': 'object',
    'properties': {
        'designation_name': {
            'type': 'string',
            'required': true
        },
        'is_active': {
            'type': 'boolean',
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
        'is_active': {
            'type': 'boolean',
            'required': true
        }
    }
}

schemas.specsHeading = {
    'name': '/specsHeadingDetails',
    'type': 'object',
    'required': true,
    'properties': {
        'name': {
            'type': 'string',
            'required': true,
            'unique': true
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        },
        'sequence': {
            'type': 'number',
            'required': true
        },
        'created_by': {
            'type': 'number',
            'required': true
        },
        'updated_by': {
            'type': 'number',
            'required': true
        }
    }
}

schemas.updateSpecsHeading = {
    'name': '/updateSpecsHeading',
    'type': 'object',
    'required': true,
    'properties': {
        'specs_heading_id': {
            'type': 'number',
            'required': true
        },
        'name': {
            'type': 'string',
            'required': false
        },
        'is_active': {
            'type': 'boolean',
            'required': false
        },
        'sequence': {
            'type': 'number',
            'required': false
        },
        'updated_by': {
            'type': 'number',
            'required': true
        }
    }
}

schemas.specsDetails = {
    'name': '/specsDetails',
    'type': 'object',
    'required': true,
    'properties': {
        'name': {
            'type': 'string',
            'required': true
        },
        'specs_heading_id': {
            'type': 'number',
            'required': true
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        },
        'value': {
            'type': 'string',
            'required': true
        }
    }
}

schemas.updateSpecs = {
    'name': '/updateSpecs',
    'type': 'object',
    'required': true,
    'properties': {
        'specs_id': {
            'type': 'number',
            'required': true
        },
        'name': {
            'type': 'string',
            'required': false
        },
        'specs_heading_id': {
            'type': 'number',
            'required': false
        },
        'is_active': {
            'type': 'boolean',
            'required': false
        },
        'value': {
            'type': 'string',
            'required': false
        }
    }
}

schemas.addYears = {
    'name': '/yearMasterDetails',
    'type': 'object',
    'required': true,
    'properties': {
        'year': {
            'type': 'number',
            'required': true
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        },
        'type': {
            'type': 'string',
            'required': true
        }
    }
}

schemas.updateYear = {
    'name': '/updateYearMaster',
    'type': 'object',
    'required': true,
    'properties': {
        'year_id': {
            'type': 'number',
            'required': true
        },
        'year': {
            'type': 'string',
            'required': false
        },
        'is_active': {
            'type': 'boolean',
            'required': false
        },
        'type': {
            'type': 'string',
            'required': false
        }
    }
}

schemas.accessoryCat = {
    'name': '/accessoryCategory',
    'type': 'object',
    'required': true,
    'properties': {
        'name': {
            'type': 'string',
            'required': true
        },
        'name_arabic': {
            'type': 'string',
            'required': false
        },
        'sequence': {
            'type': 'number',
            'required': true
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        }
    }
}

schemas.updateAccessoryCat = {
    'name': '/updateAccessoryCategory',
    'type': 'object',
    'required': true,
    'properties': {
        'accessory_cat_id': {
            'type': 'number',
            'required': true
        },
        'name': {
            'type': 'string',
            'required': false
        },
        'name_arabic': {
            'type': 'string',
            'required': false
        },
        'sequence': {
            'type': 'number',
            'required': false
        },
        'is_active': {
            'type': 'boolean',
            'required': false
        }
    }
}

schemas.responseStatus = {
    'name': '/responseStatus',
    'type': 'object',
    'required': true,
    'properties': {
        'status': {
            'type': 'string',
            'required': true,
            'unique': true
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        },
        'created_by': {
            'type': 'number',
            'required': true
        },
        'updated_by': {
            'type': 'number',
            'required': true
        }
    }
}

schemas.updateResponseStatus = {
    'name': '/updateResponseStatus',
    'type': 'object',
    'required': true,
    'properties': {
        'rsp_status_id': {
            'type': 'number',
            'required': true
        },
        'status': {
            'type': 'string',
            'required': false
        },
        'is_active': {
            'type': 'boolean',
            'required': false
        },
        'updated_by': {
            'type': 'number',
            'required': true
        }
    }
}


schemas.addLookupRqst = {
    'name': '/addLookupRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'body_name': {
            'type': 'string',
            'required': true,
            'unique': true
        },
        'type': {
            'type': 'string',
            'required': true,
            'unique': true
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        },
        'created_by': {
            'type': 'boolean',
            'required': true
        },
        'updated_by': {
            'type': 'number',
            'required': true
        }
    }
}

schemas.addServiceTypeDetail = {
    'id': '/addServiceTypeDetail',
    'type': 'object',
    'properties': {
        'service_type_english': {
            'type': 'string',
            'required': true
        },
        'service_type_arabic': {
            'type': 'string',
            'required': true
        },
        'show_price': {
            'type': 'bit',
            'required': true
        },
        'is_active': {
            'type': 'boolean',
            'required': false
        }
    }
}

schemas.updateServiceTypeDetail = {
    'id': '/updateServiceTypeDetail',
    'type': 'object',
    'properties': {
        'service_type_id': {
            'type': 'integer',
            'required': true
        },
        'service_type_english': {
            'type': 'string',
            'required': true
        },
        'service_type_arabic': {
            'type': 'string',
            'required': true
        },
        'show_price': {
            'type': 'bit',
            'required': true
        },
        'is_active': {
            'type': 'boolean',
            'required': false
        }
    }
}

schemas.addServiceDetail = {
    'id': '/addServiceDetail',
    'type': 'object',
    'properties': {
        'service_english': {
            'type': 'string',
            'required': true
        },
        'service_arabic': {
            'type': 'string',
            'required': false
        },
        'price': {
            'type': 'decimal',
            'required': true
        },
        'service_type_id': {
            'type': 'integer',
            'required': true
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        },
        'locations': {
            'type': 'array',
            'item': {
                '$ref': '/locationDetails',
            },
            'required': true
        }
    }
}

schemas.locationDetails = {
    'name': '/locationDetails',
    'type': 'object',
    'required': true,
    'properties': {
        'location_id': {
            'type': 'integer',
            'required': true
        }
    }
}


schemas.updateServiceDetail = {
    'id': '/addServiceDetail',
    'type': 'object',
    'properties': {
        'service_english': {
            'type': 'string',
            'required': true
        },
        'service_arabic': {
            'type': 'string',
            'required': false
        },
        'price': {
            'type': 'decimal',
            'required': true
        },
        'service_type_id': {
            'type': 'integer',
            'required': true
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        },
        'locations': {
            'type': 'array',
            'item': {
                '$ref': '/updateLocationDetails',
            },
            'required': true
        }
    }
}

schemas.updateLocationDetails = {
    'name': '/updateLocationDetails',
    'type': 'object',
    'required': true,
    'properties': {
        'location_id': {
            'type': 'integer',
            'required': true
        },
        'prev_location_id': {
            'type': 'integer',
            'required': true
        }
    }
}

_validator.addSchema(schemas.pageDetails, '/pageDetails');
_validator.addSchema(schemas.locationDetails, '/locationDetails');
_validator.addSchema(schemas.updateLocationDetails, '/updateLocationDetails');



schemas.validate = function (object, schema) {
    let errors = _validator.validate(object, schema).errors;
    if (errors.length > 0) {
        logger.error(util.format('Schema validation failed for id:- %s errors:- %j', schema.id, errors));
    }
    return errors.length <= 0 ? true : false;
};

module.exports = schemas;