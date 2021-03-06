const _ = require('lodash');
let fs = require('fs');
let mkdirp = require('mkdirp');
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


let uploadFile = function(fileObj, file_type, file_path, id, file_name) {
	let result;
	// var file = fileObj;
	let fileMime = fileObj.mimetype;
	let type = fileMime.split('/')[0];
	let format = fileMime.split('/')[1];
	mkdirp(file_path + id, function(err) {
		if (err) {
			fs.unlink(fileObj.path);
			result = 'error_occured';
		} else {
			fs.readFile(fileObj.path, function(err, data) {
				let newPath = file_path + id + '/' + file_name;
				fs.writeFile(newPath, data, function(err) {
					//delete the temporary file
					fs.unlink(fileObj.path);
					if (err) {
						// console.log(err);
						result = 'error_occured';
					} else {
						result = true;
					}
				});
			});
		}
	});
	while (result === undefined) {
		require('deasync').runLoopOnce();
	}
	return result;
}

let unlink_file = function(path) {
	let result;
	fs.unlink(path, function(err) {
		if (err) {
			result = 'error_occured';
		} else {
			result = true;
		}
	});
	while (result === undefined) {
		require('deasync').runLoopOnce();
	}
	return result;
}






module.exports = {
	sanitize: sanitize,
	unlink_file:unlink_file,
	uploadFile:uploadFile
};