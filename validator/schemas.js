var util = require('util');
var Validator = require('jsonschema').Validator;
var logger = require('../utils/logger');
var constants = require('../utils/constants');
var _validator = new Validator();

var schemas = function () {
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
            'type':'object',
            '$ref': '/addressDetails',
            'required' : true
        }
    }
}
schemas.addressDetails = {
    'id': '/addressDetails',
    'type': 'object',
    'required':true,
    'properties': {
        'homeAddress': {
            'type': 'string',
            'required': true
        }
    }
}

_validator.addSchema(schemas.addressDetails, '/addressDetails');


schemas.designationDetail = {
    'id': '/designationDetail',
    'type': 'object',
    'properties': {
        'designation_name': {
            'type': 'string',
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

_validator.addSchema(schemas.pageDetails, '/pageDetails');

schemas.validate = function (object, schema) {
    var errors = _validator.validate(object, schema).errors;
    if (errors.length > 0) {
        logger.error(util.format('Schema validation failed for id:- %s errors:- %j', schema.id, errors));
    }
    return errors.length <= 0 ? true : false;
};

module.exports = schemas;