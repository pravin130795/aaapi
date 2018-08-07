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
        'name_arabic': {
            'type': 'string',
            'required': false
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        },
        'sequence': {
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
        'name_arabic': {
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
        },
        'value_arabic': {
            'type': 'string',
            'required': false
        },
        'is_model_overview': {
            'type': 'boolean',
            'required': true,
        },
        'is_variant_overview': {
            'type': 'boolean',
            'required': true,
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
        },
        'value_arabic': {
            'type': 'string',
            'required': false
        },
        'is_model_overview': {
            'type': 'boolean',
            'required': false,
        },
        'is_variant_overview': {
            'type': 'boolean',
            'required': false,
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

schemas.addAreaRqst = {
    'name': '/areaMaster',
    'type': 'object',
    'required': true,
    'properties': {
        'name': {
            'type': 'string',
            'required': true,
            'unique': true
        },
        'type': {
            'type': 'string',
            'required': true,
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
schemas.updateAreaRqst = {
    'name': '/updateAreaRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'area_id': {
            'type': 'number',
            'required': true
        },
        'name': {
            'type': 'string',
            'required': false,
            'unique': true
        },
        'type': {
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

schemas.bankEmiMaster = {
    'name': '/bankEmiMaster',
    'type': 'object',
    'required': true,
    'properties': {
        'name': {
            'type': 'string',
            'required': true,
            'unique': true
        },
        'emi': {
            'type': 'float',
            'required': true
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        }
    }
}
schemas.updateBankEmiMaster = {
    'name': '/updateBankEmiMaster',
    'type': 'object',
    'required': true,
    'properties': {
        'bank_id' : {
            'type': 'number',
            'required': true
        },
        'name': {
            'type': 'string',
            'required': false,
            'unique': true
        },
        'emi': {
            'type': 'float',
            'required': false
        },
        'is_active': {
            'type': 'boolean',
            'required': false
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
        },
        'updated_by': {
            'type': 'number',
            'required': true
        }
    }
}

schemas.updateContactsRqst = {
    'name': '/updateContactsRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'contact_id': {
            'type': 'number',
            'required': true
        },
        'module_name': {
            'type': 'string',
            'required': false,
            'unique': true
        },
        'contact_no': {
            'type': 'string',
            'required': false
        },
        'updated_by': {
            'type': 'number',
            'required': true
        }
    }
}
schemas.updateEmailRqst = {
    'name': '/updateEmailRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'email_id': {
            'type': 'number',
            'required': true
        },
        'module_name': {
            'type': 'string',
            'required': false,
            'unique': true
        },
        'emp_name': {
            'type': 'string',
            'required': false
        },
        'email': {
            'type': 'string',
            'required': false
        },
        'contact_no': {
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

schemas.updateStockRqst = {
    'name': '/updateStockRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'stock_id': {
            'type': 'number',
            'required': true
        },
        'stock': {
            'type': 'string',
            'required': false
        },
        'limit': {
            'type': 'string',
            'required': false
        },
        'range': {
            'type': 'number',
            'required': false
        },
        'updated_by': {
            'type': 'number',
            'required': true
        }
    }
}

schemas.addSocialRqst = {
    'name': '/addSocialRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'name': {
            'type': 'string',
            'required': true,
            'unique': true
        },
        'url': {
            'type': 'string',
            'required': true
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
schemas.updateSocialRqst = {
    'name': '/updateSocialRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'social_id': {
            'type': 'number',
            'required': true,
        },
        'name': {
            'type': 'string',
            'required': false,
            'unique': true
        },
        'url': {
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

schemas.addNotifyRqst = {
    'name': '/addNotifyRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'name': {
            'type': 'string',
            'required': true,
            'unique': true
        },
        'expiry': {
            'type': 'number',
            'required': true
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
schemas.updateNotifyRqst = {
    'name': '/updateNotifyRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'notify_id': {
            'type': 'number',
            'required': true,
        },
        'name': {
            'type': 'string',
            'required': false,
            'unique': true
        },
        'expiry': {
            'type': 'number',
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

schemas.addKmRqst = {
    'name': '/addKmRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'km_value': {
            'type': 'number',
            'required': true,
            'unique': true
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        },
        'created_by': {
            'type': 'number',
            'required': true,
        },
        'updated_by': {
            'type': 'number',
            'required': true
        }
    }
}
schemas.updateKmRqst = {
    'name': '/updateKmRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'km_id': {
            'type': 'number',
            'required': true
        },
        'km_value': {
            'type': 'number',
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

schemas.addMerchandiseCatRqst = {
    'name': '/addMerchandiseCatRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'name': {
            'type': 'string',
            'required': true,
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
schemas.updateMerchandiseCatRqst = {
    'name': '/updateMerchandiseCatRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'merchandise_cat_id': {
            'type': 'number',
            'required': true
        },
        'name': {
            'type': 'string',
            'required': false,
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
        },
        'updated_by': {
            'type': 'number',
            'required': true
        }
    }
}

schemas.addColorRqst = {
    'name': '/addColorRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'name': {
            'type': 'string',
            'required': true,
        },
        'name_arabic': {
            'type': 'string',
            'required': false
        },
        'color_code': {
            'type': 'string',
            'required': true
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
schemas.updateColorRqst = {
    'name': '/updateColorRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'color_id': {
            'type': 'number',
            'required': true
        },
        'name': {
            'type': 'string',
            'required': false,
        },
        'name_arabic': {
            'type': 'string',
            'required': false
        },
        'color_code': {
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

schemas.mapColorRqst = {
    'name': '/mapColorRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'color_id': {
            'type': 'number',
            'required': true,
        },
        'autoline_colors': {
            'type': 'array',
            'items': {
                '$ref': '/autolineColors'
            },
            'required': true
        }
    }
}

schemas.updateMapColorRqst = {
    'name': '/updateMapColorRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'color_id': {
            'type': 'number',
            'required': true,
        },
        'autoline_colors': {
            'type': 'array',
            'items': {
                '$ref': '/autolineColors'
            },
            'required': true
        },
        'prev_autoline_id' : {
            'type': 'number',
            'required': true
        }
    }
}

schemas.autolineColors = {
    'id': '/autolineColors',
    'type': 'object',
    'properties': {
        'autoline_color_id': {
            'type': 'number',
            'required': true
        }
    }
}

schemas.addNewsRqst = {
    'name': '/addNewsRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'name': {
            'type': 'string',
            'required': true,
        },
        'description': {
            'type': 'string',
            'required': false
        },
        'url': {
            'type': 'string',
            'required': true
        },
        'update_date': {
            'type': 'string',
            'required': true
        },
        'start_date': {
            'type': 'string',
            'required': true
        },
        'end_date': {
            'type': 'string',
            'required': true
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        },
        'is_approved': {
            'type': 'boolean',
            'required': true
        }
    }
}
schemas.updateNewsRqst = {
    'name': '/updateNewsRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'news_id': {
            'type': 'number',
            'required': true
        },
        'name': {
            'type': 'string',
            'required': false,
        },
        'description': {
            'type': 'string',
            'required': false
        },
        'url': {
            'type': 'string',
            'required': false
        },
        'update_date': {
            'type': 'string',
            'required': false
        },
        'start_date': {
            'type': 'string',
            'required': false
        },
        'end_date': {
            'type': 'string',
            'required': false
        },
        'is_active': {
            'type': 'boolean',
            'required': false
        },
        'is_approved': {
            'type': 'boolean',
            'required': false
        }
    }
}

schemas.addMagazineRqst = {
    'name': '/addMagazineRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'name': {
            'type': 'string',
            'required': true,
        },
        'name_arabic': {
            'type': 'string',
            'required': false
        },
        'description': {
            'type': 'string',
            'required': false
        },
        'description_arabic': {
            'type': 'string',
            'required': false
        },
        'upload_date': {
            'type': 'string',
            'required': true
        },
        'start_date': {
            'type': 'string',
            'required': true
        },
        'end_date': {
            'type': 'string',
            'required': true
        },
        'file_type': {
            'type': 'string',
            'required': true
        },
        'is_active': {
            'type': 'boolean',
            'required': true
        },
        'is_approved': {
            'type': 'boolean',
            'required': true
        }
    }
}
schemas.updateMagazineRqst = {
    'name': '/updateMagazineRqst',
    'type': 'object',
    'required': true,
    'properties': {
        'news_id': {
            'type': 'number',
            'required': true
        },
        'name': {
            'type': 'string',
            'required': false,
        },
        'name_arabic': {
            'type': 'string',
            'required': false
        },
        'description': {
            'type': 'string',
            'required': false
        },
        'description_arabic': {
            'type': 'string',
            'required': false
        },
        'upload_date': {
            'type': 'string',
            'required': false
        },
        'start_date': {
            'type': 'string',
            'required': false
        },
        'end_date': {
            'type': 'string',
            'required': false
        },
        'file_type': {
            'type': 'string',
            'required': false
        },
        'is_active': {
            'type': 'boolean',
            'required': false
        },
        'is_approved': {
            'type': 'boolean',
            'required': false
        }
    }
}

_validator.addSchema(schemas.autolineColors, '/autolineColors');

schemas.validate = function (object, schema) {
    let errors = _validator.validate(object, schema).errors;
    if (errors.length > 0) {
        logger.error(util.format('Schema validation failed for id:- %s errors:- %j', schema.id, errors));
    }
    return errors.length <= 0 ? true : false;
};

module.exports = schemas;