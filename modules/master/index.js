let service = require('./master-service');

module.exports = function (app) {
    // To Insert Designation Details To Database

    // To Insert into Designation Master
    app.post('/master/adddesignation', service.addDesignation);

    // To Get details from Designation Master 
    app.get('/master/getdesignation', service.getDesignation);

    // To Update designations Master 
    app.put('/master/updatedesignation', service.updateDesignation)


    // To Insert Service Type Details To Database

    // To Insert into Service Type Master
    app.post('/master/addservicetype', service.addServiceType);

    // To Get details from Service Type Master
    app.get('/master/getservicetype', service.getServiceType);

    // To Update service type Master  
    app.put('/master/updatservicetype', service.updateServiceType);


    // To Insert Service Details To Database

    // To Insert into Service  Master 
    app.post('/master/addservice', service.addService);

    // To Get details from Service Master
    app.get('/master/getservice', service.getServices);

    // To Update service Master
    app.put('/master/updateservice', service.updateService)


    
    // Specs Heading Master
    // To Insert into Specification Heading Master
    app.post('/master/addspecsheading', service.addSpecsHeading);
    // To Get details from Specification Heading Master
    app.get('/master/getspecsheading', service.getSpecsHeading);
    // To Update Specification Heading Master 
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

    // Response status master 
    app.post('/master/addresponsestatus', service.addResponseStatus);
    app.get('/master/getresponsestatus', service.getResponseStatus);
    app.put('/master/updateresponsestatus', service.updateResponseStatus);


    // Lookup master
    app.post('/master/addlookup', service.addLookup);
}