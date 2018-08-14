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
                                            resolve({message:"merchandise is create successfully"});
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


/**
 * API To Update merchandise Details 
 * @param {integer} merchandise_id - Represents the merchandise Id.
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
merchandise.updateMerchandiseDetails = function(options){
    return new Promise((resolve, reject) => {
        let uploadBody = dataform(options);
        uploadBody.default_images = uploadBody.default_image;
        uploadBody.default_image = "";
        uploadBody.updated_at = new Date();
        uploadBody.updated_by = 1;//options.current_user_id;
        let imageUrl = "";
        let fileName = "";
        let fileName_arr = "";
        let fileType = "";
        let newFileName = "";
        let uploadResult = false;
        fileName = uploadBody.default_images.originalname;
        fileName_arr = fileName.split('.');
        fileType = fileName_arr[fileName_arr.length - 1];
        newFileName = guid(6) + '_' + options.data.merchandise_id + '.' + fileType;
        uploadResult = utils.uploadFile(uploadBody.default_images, fileType, root_path + "/public/upload/merchandise/", options.data.merchandise_id, newFileName);
        utils.unlink_file(uploadBody.default_images.path);
        if (uploadResult) {
            imageUrl = "/upload/merchandise/" + options.data.merchandise_id + '/' + newFileName;
        }
        uploadBody.default_image = imageUrl;
        console.log(uploadBody);
        global.sqlInstance.sequelize.models.merchandise_stock.update(uploadBody,{
            where:{
                merchandise_id:options.data.merchandise_id
            }
        })
        .then((updateResponse) => {
            if(updateResponse[0] > 0){
                // resolve({message:"merchandise is update successfully"})
                return updateMerchandiseImages(options.files, options.data.merchandise_id).then((result) => {
                    //t.commit();
                    resolve({message:"merchandise is update successfully"});
                }).catch((error) => {
                    //t.rollback();
                    reject(error);
                });
            }else{
                resolve({message:"merchandise is not exist"})
            }
        })
        .catch((error)=>{
            reject(error);
        })
    });
}



let updateMerchandiseImages = function (ImagesData, id, finalResult = {}) {
    return new Promise((resolve, reject) => {
        let images = [];
        let imageUrl = "";
        let fileName = "";
        let fileName_arr = "";
        let fileType = "";
        let newFileName = "";
        let uploadResult = false;
        if(ImagesData.length > 0 ){
            let singleFile = ImagesData.pop();
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
            global.sqlInstance.sequelize.models.merchandise_image.update(
                {image:imageUrl},
                {where:{merchandise_id:id}}
            ).then((response) => {
                finalResult.result = response;
                updateMerchandiseImages(ImagesData, id, finalResult).then((result) => {
                    //t.commit();
                    resolve(response);
                }).catch((error) => {
                    //t.rollback();
                    reject(error);
                });
            })
        }else{
            resolve(finalResult)
        }

        
    });
}

/**
 * API To List Merchandise Details 
 * @param {string} search - Represents the search for filter.
 * @param {string} status - Represents the staus for filter.
 * @returns {Array} - Merchandise Lists
 */
merchandise.getMerchandises = function (options) {
    return new Promise((resolve, reject) => {
        let Condition = {};
        let { status, search } = options;
        let whereCondition = {
            [Op.and]: new Array()
        };
        if (typeof status != 'undefined') {
            if (status != '') {
                whereCondition[Op.and].push({ is_active: status });
            }
        }
        if (search != '') {
            if (typeof search != 'undefined') {
                let orCondition = {
                    [Op.or]: new Array(
                        {
                            'merchandise_name': { [Op.like]: '%' + search + '%' }
                        },
                        {
                            'merchandise_description': { [Op.like]: '%' + search + '%' }
                        },
                        {
                            'merchandise_specification': { [Op.like]: '%' + search + '%' }
                        },
                        {
                            'merchandise_name_arabic': { [Op.like]: '%' + search + '%' }
                        },
                        {
                            'quantity': { [Op.like]: '%' + search + '%' }
                        },
                        {
                            'item_no': { [Op.like]: '%' + search + '%' }
                        },
                        {
                            'price': { [Op.like]: '%' + search + '%' }
                        }
                    )
                };
                whereCondition[Op.and].push(orCondition);
                Condition = whereCondition;
            }
        }
        global.sqlInstance.sequelize.models.merchandise_stock.findAll({
            where: Condition,
            attributes:['merchandise_id','autoline_id','merchandise_cat_id','merchandise_name','merchandise_name_arabic','merchandise_description','merchandise_specification','is_new_arrivals','default_image','quantity','item_no','price','is_active'],
            include: [
                {
                    model: global.sqlInstance.sequelize.models.merchandise_image, as: 'merchandise_images', required: true,
                    attributes: ['image_id', 'image'],
                },
                {
                    model: global.sqlInstance.sequelize.models.merchandiseCatMaster, as: 'merchandise_category', required: true,
                    attributes: ['merchandise_cat_id', 'name'],
                }
            ]
        })
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                logger.error(util.format("EXCEPTION OF MERCHANDISE LIST. %j", error))
                return reject(error)
            })
    });
}


merchandise.mapCategoryToMerchandise = function(options){
    return new Promise((resolve, reject) => {

        options.category_ids.forEach(singleObj =>{
            let dataObj ={
                merchandise_cat_id:singleObj.category_id
            }
            global.sqlInstance.sequelize.models.merchandise_stock.update(dataObj, {
                where: { merchandise_id: singleObj.merchandise_id }
            }).then(response => {
                if (response[0]> 0) {
                    resolve({ message: 'category map with merchandise successfully.' });
                } else {
                    resolve({ message: 'Row does not exist' });
                }
            }).catch(error => {
                reject(error);
            })
        })
    })
}
module.exports = merchandise;