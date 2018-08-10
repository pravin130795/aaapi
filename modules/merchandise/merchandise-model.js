const _ = require('lodash');
var path = require('path');
var guid = require('uid2');
const async = require('async');
const util = require('util');
const logger = require('../../utils/logger');
const models = require('../../database/sql');
const constants = require('../../utils/constants');
const utils = require('../../utils/common');
const Op = global.sqlInstance.sequelize.Op;
const root_path = path.dirname(require.main.filename);
/** @namespace */
let merchandise = function () {

};

/**
 * API To Insert merchandise Details 
 * @param {integer} autoline_id - Represents the autoline Id.
 * @param {string} autoline_description - Represents the autoline description.
 * @param {enum} is_new_arrival - Represents the new arrival Yes or No.
 * @param {string} merchandise_description - Represents the merchandise description.
 * @param {string} merchandise_specification - Represents the merchandise specification.
 * @param {integer} item_no - Represents the autoline item no.
 * @param {string} merchandise_name - Represents the merchandise name.
 * @param {string} merchandise_name_arabic - Represents the merchandise name in arabic.
 * @param {integer} quantity - Represents the quantity.
 * @param {integer} price - Represents the price.
 * @param {integer} merchandise_cat_id - Represents the merchandise category Id.
 * @param {boolean} is_active - Represents the is active.
 * @param {file} images - Represents the multiple upload images.
 * @param {file} dafault_image - Represents the default image set.
 * @returns {message} - merchandise create successfully
 */
merchandise.addMerchandiseDetail = function (options) {
    return new Promise((resolve, reject) => {
        //return models.sequelize.transaction({ autocommit: false }).then((t) => {

        let uploadBody = dataform(options);
        //console.log("final result---->",uploadBody);
        return global.sqlInstance.sequelize.models.merchandise_stock.findOne({
            where: { merchandise_name: uploadBody.merchandise_name }
        })
            .then((merchandiseExist) => {
                if (!_.isEmpty(merchandiseExist)) {
                    //console.log("--->",merchandiseExist);
                    resolve({ message: "merchandise is already exists, please try new one." })
                } else {
                    uploadBody.default_images = uploadBody.default_image;
                    uploadBody.default_image = "";
                    uploadBody.created_by = 1;//options.current_user_id;
                    uploadBody.updated_by = 1;//options.current_user_id;
                    return global.sqlInstance.sequelize.models.merchandise_stock.create(uploadBody)
                        .then((response) => {
                            if (!_.isEmpty(response)) {
                                let imageUrl = "";
                                let fileName = "";
                                let fileName_arr = "";
                                let fileType = "";
                                let newFileName = "";
                                let uploadResult = false;
                                fileName = uploadBody.default_images.originalname;
                                fileName_arr = fileName.split('.');
                                fileType = fileName_arr[fileName_arr.length - 1];
                                newFileName = guid(6) + '_' + response.merchandise_id + '.' + fileType;
                                uploadResult = utils.uploadFile(uploadBody.default_images, fileType, root_path + "/public/upload/merchandise/", response.merchandise_id, newFileName);
                                utils.unlink_file(uploadBody.default_images.path);
                                if (uploadResult) {
                                    imageUrl = "/upload/merchandise/" + response.merchandise_id + '/' + newFileName;
                                }
                                response.update({ default_image: imageUrl })
                                    .then((updateResponse) => {
                                        return insertMerchandiseImages(options.files, response.merchandise_id).then((result) => {
                                            //t.commit();
                                            resolve(response);
                                        }).catch((error) => {
                                            //t.rollback();
                                            reject(error);
                                        });
                                    })
                            } else {
                                //t.rollback();
                                reject('something went worng in merchandise creation')
                            }
                        })
                        .catch((error) => {
                            //t.rollback();
                            reject(error);
                        })
                }
            })
    });

    //})
}


let insertMerchandiseImages = function (ImagesData, id, finalResult = {}) {
    return new Promise((resolve, reject) => {
        let images = [];
        let imageUrl = "";
        let fileName = "";
        let fileName_arr = "";
        let fileType = "";
        let newFileName = "";
        let uploadResult = false;
        ImagesData.forEach(singleFile => {
            if (singleFile.fieldname === 'images') {
                fileName = singleFile.originalname;
                fileName_arr = fileName.split('.');
                fileType = fileName_arr[fileName_arr.length - 1];
                newFileName = guid(6) + '_' + id + '.' + fileType;
                uploadResult = utils.uploadFile(singleFile, fileType, root_path + "/public/upload/merchandise/", id, newFileName);
                utils.unlink_file(singleFile.path);
                if (uploadResult) {
                    imageUrl = "/upload/merchandise/" + id + '/' + newFileName;
                }
                images.push({ merchandise_id: id, image: imageUrl });
            }
        });
        console.log("hello_1", images);
        return global.sqlInstance.sequelize.models.merchandise_image.bulkCreate(images)
            .then((response) => {
                //console.log("images response",response);
                return global.sqlInstance.sequelize.models.merchandise_image.findAll();
            })
            .then((merchandiseImages) => {
                //console.log(merchandiseImages)
                resolve(merchandiseImages)
            })
            .catch((error) => {
                reject(error);
            })
    });
}


let dataform = function (options) {
    //console.log("===========",options)
    let Data = {
        autoline_id: Number(options.data.autoline_id),
        autoline_description: options.data.autoline_description,
        is_new_arrivals: options.data.is_new_arrivals,
        merchandise_description: options.data.merchandise_description,
        merchandise_specification: options.data.merchandise_specification,
        item_no: Number(options.data.item_no),
        merchandise_name: options.data.merchandise_name,
        merchandise_name_arabic: options.data.merchandise_name_arabic,
        quantity: Number(options.data.quantity),
        price: Number(options.data.price),
        merchandise_cat_id: Number(options.data.merchandise_cat_id),
        is_active: options.data.is_active
    };

    options.files.forEach(singleFile => {
        if (singleFile.fieldname === 'default_image') {
            Data.default_image = singleFile;
        }
    });
    return Data;
};



module.exports = merchandise;