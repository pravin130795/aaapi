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

<<<<<<< HEAD:validator/schemas.js
schemas.addAreaRqst = {
    'name': '/areaMaster',
=======
schemas.bankEmiMaster = {
    'name': '/bankEmiMaster',
>>>>>>> fa6057ca4078412392716f4a4ea194608770ae2b:modules/master/master-schema.js
    'type': 'object',
    'required': true,
    'properties': {
        'name': {
            'type': 'string',
            'required': true,
            'unique': true
        },
<<<<<<< HEAD:validator/schemas.js
        'type': {
            'type': 'string',
            'required': true,
=======
        'emi': {
            'type': 'float',
            'required': true
>>>>>>> fa6057ca4078412392716f4a4ea194608770ae2b:modules/master/master-schema.js
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
<<<<<<< HEAD:validator/schemas.js
schemas.updateAreaRqst = {
    'name': '/updateAreaRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'area_id': {
=======
schemas.updateBankEmiMaster = {
    'name': '/updateBankEmiMaster',
    'type': 'object',
    'required': true,
    'properties': {
        'bank_id' : {
>>>>>>> fa6057ca4078412392716f4a4ea194608770ae2b:modules/master/master-schema.js
            'type': 'number',
            'required': true
        },
        'name': {
            'type': 'string',
            'required': false,
            'unique': true
        },
<<<<<<< HEAD:validator/schemas.js
        'type': {
            'type': 'string',
=======
        'emi': {
            'type': 'float',
>>>>>>> fa6057ca4078412392716f4a4ea194608770ae2b:modules/master/master-schema.js
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
<<<<<<< HEAD:validator/schemas.js
            'type': 'number',
            'required': true
        },
        'updated_by': {
            'type': 'number',
            'required': true
        }
    }
}
schemas.updateLookupRqst = {
    'name': '/updateLookupRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'lookup_id': {
            'type': 'number',
            'required': true
        },
        'body_name': {
            'type': 'string',
            'required': false,
            'unique': true
        },
        'type': {
            'type': 'string',
            'required': false,
            'unique': true
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

schemas.addFromToPriceRqst = {
    'name': '/addFromToPriceRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'from_price': {
            'type': 'decimal',
            'required': true,
            'unique': true
        },
        'to_price': {
            'type': 'decimal',
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
            'type': 'number',
            'required': true
        },
        'updated_by': {
            'type': 'number',
            'required': true
        }
    }
}
schemas.updateFromToPriceRqst = {
    'name': '/updateFromToPriceRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'from_to_price_id': {
            'type': 'number',
            'required': true
        },
        'from_price': {
            'type': 'decimal',
            'required': false,
            'unique': true
        },
        'to_price': {
            'type': 'decimal',
            'required': false,
            'unique': true
        },
        'type': {
            'type': 'string',
            'required': false,
            'unique': true
        },
        'is_active': {
            'type': 'boolean',
            'required': false
=======
            'type': 'boolean',
            'required': true
>>>>>>> fa6057ca4078412392716f4a4ea194608770ae2b:modules/master/master-schema.js
        },
        'updated_by': {
            'type': 'number',
            'required': true
        }
    }
}

<<<<<<< HEAD:validator/schemas.js
=======
_validator.addSchema(schemas.pageDetails, '/pageDetails');

>>>>>>> fa6057ca4078412392716f4a4ea194608770ae2b:modules/master/master-schema.js
schemas.validate = function (object, schema) {
    let errors = _validator.validate(object, schema).errors;
    if (errors.length > 0) {
        logger.error(util.format('Schema validation failed for id:- %s errors:- %j', schema.id, errors));
    }
    return errors.length <= 0 ? true : false;
};

module.exports = schemas;