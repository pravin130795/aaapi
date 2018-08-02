const _ = require('lodash');
const constants = require('../utils/constants');

/**
 * This function will remove all the fields which is not included in schema.
 * 
 * @param object
 *            data object
 * @param schema
 *            schema for the object to compare fields
 */
let sanitize = function (object, schema, modelName) {
	let schemaKeys = _.keys(schema.properties);
	let objectKeys = _.keys(object);
	let constantsValues = _.values(constants.keys);

	for (let key in objectKeys) {
		let isValueMatched = false;
		for (let index in constantsValues) {
			if (constantsValues[index].indexOf(objectKeys[key].substring(0, constantsValues[index].length)) === 0) {
				isValueMatched = true;
				break;
			}
		}
		if (object[objectKeys[key]] == null || object[objectKeys[key]] === "") {
			delete object[objectKeys[key]];
		}
		if (!isValueMatched && schemaKeys.indexOf(objectKeys[key]) === -1) {
			delete object[objectKeys[key]];
		} else {
			let propertyList = _.keys(schema.properties[objectKeys[key]]);
			for (let index = 0; index < propertyList.length; index++) {
				if (propertyList[index] === '$ref') {
					let refValue = schema.properties[objectKeys[key]];
					let schemas = require('../modules/' + modelName + '/' + modelName + '-schema');
					let refSchema = refValue.$ref.substring(1, refValue.$ref.length);
					sanitize(object[objectKeys[key]], schemas[refSchema]);
				}
			}
		}
	}
	// logger.info(util.format('%j', object));
	return object;
};

module.exports = {
	sanitize: sanitize
};