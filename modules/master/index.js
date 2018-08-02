let service = require('./master-service');

module.exports = function (app) {
    // To Insert Designation Details To Database
    app.post('/master/adddesignation', service.addDesignation);
    app.get('/master/getdesignation', service.getDesignation);
    app.put('/master/updatedesignation', service.updateDesignation)
    /* Specs Heading Master */
    /* To Insert into Specification Heading Master */
    app.post('/master/addspecsheading', service.addSpecsHeading);
    /* To Get details from Specification Heading Master */
    app.get('/master/getspecsheading', service.getSpecsHeading);
    /* To Update Specification Heading Master  */
    app.put('/master/updatespecsheading', service.updateSpecsHeading);

    //Specs Master
    app.post('/master/addspecsmaster', service.addSpecs);
    app.get('/master/getspecsmaster', service.getSpecs);
    app.put('/master/specsMaster/update', service.updateSpecs);
    //Year Master
    app.post('/master/addyear', service.addYear);
    app.get('/master/getyear', service.getYear);
    app.put('/master/updateyear', service.updateYear);
    //Color Master

    //Accessory Category Master
    app.post('/master/addaccessorycategory', service.addAccessoryCat);
    app.get('/master/getaccessorycategory', service.getAccessoryCat);
    app.put('/master/updateaccessorycategory', service.updateAccessoryCat);

    /* Response status master */
    app.post('/master/addresponsestatus', service.addResponseStatus);
    app.get('/master/getresponsestatus', service.getResponseStatus);
    app.put('/master/updateresponsestatus', service.updateResponseStatus);

    /* Area Master */
    app.post('/master/addarea', service.addArea);
    app.get('/master/getarea', service.getArea);
    app.put('/master/updatearea', service.updateArea);

    // Bank master
    /* app.post('/master/addbankemi', service.addBankEmi);
    app.get('/master/getbankemi', service.getBankEmi);
    app.put('/master/updatebankemi', service.updateBankEmi) */

    /* Lookup master  */
    app.post('/master/addlookup', service.addLookup);
    app.get('/master/getlookup', service.getLookup);
    app.put('/master/updatelookup', service.updateLookup);

    /* From to Price master */
    app.post('/master/addfromtoprice', service.addFromToPrice);
    app.get('/master/getfromtoprice', service.getFromToPrice);
    app.put('/master/updatefromtoprice', service.updateFromToPrice);

}