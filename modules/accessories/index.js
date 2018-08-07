const service = require('./accessories-service');

module.exports = function (app) {

    // To Get Model, Variant and Brand Details From Masters
    app.get('/accessories/getmodelmasterforaccessories', service.getModelMasterForAccessories);

    // To Get Accessories based on the Model ID.
    app.post('/accessories/getvariantdetailsfrommaster', service.getVariantDetailsFromMaster);

    //To Add/Update Accessories
    app.post('/accessories/add', service.addAccessories);
}