let service = require('./master-service');

module.exports = function (app) {
    // To Insert Designation Details To Database

    // To Insert into Designation Master
    app.post('/master/adddesignation', service.addDesignation);

    // To Get details from Designation Master 
    app.get('/master/getdesignation', service.getDesignation);

    // To Update designations Master 
    app.put('/master/updatedesignation', service.updateDesignation)
    
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
    app.put('/master/updatespecsmaster', service.updateSpecs);

    //Year Master
    app.post('/master/addyear', service.addYear);
    app.get('/master/getyear', service.getYear);
    app.put('/master/updateyear', service.updateYear);

    //Accessory Category Master
    app.post('/master/addaccessorycategory', service.addAccessoryCat);
    app.get('/master/getaccessorycategory', service.getAccessoryCat);
    app.put('/master/updateaccessorycategory', service.updateAccessoryCat);

    // Response status master 
    app.post('/master/addresponsestatus', service.addResponseStatus);
    app.get('/master/getresponsestatus', service.getResponseStatus);
    app.put('/master/updateresponsestatus', service.updateResponseStatus);

    /* Area Master */
    app.post('/master/addarea', service.addArea);
    app.get('/master/getarea', service.getArea);
    app.put('/master/updatearea', service.updateArea);

    // Bank master
    app.post('/master/addbankemi', service.addBankEmi);
    app.get('/master/getbankemi', service.getBankEmi);
    app.put('/master/updatebankemi', service.updateBankEmi)

    /* Lookup master  */
    app.post('/master/addlookup', service.addLookup);
    app.get('/master/getlookup', service.getLookup);
    app.put('/master/updatelookup', service.updateLookup);

    /* From to Price master */
    app.post('/master/addfromtoprice', service.addFromToPrice);
    app.get('/master/getfromtoprice', service.getFromToPrice);
    app.put('/master/updatefromtoprice', service.updateFromToPrice);

    /* Contact Master */
    app.get('/master/getcontacts', service.getContacts);
    app.put('/master/updatecontacts', service.updateContacts);

    /* Email Setup Master */
    app.get('/master/getemail', service.getEmailDetail);
    app.put('/master/updateemail', service.updateEmailDetails);

    /* Km Master */
    app.post('/master/addkmdetails', service.addKmMaster);
    app.get('/master/getkmdetails', service.getKmMaster);
    app.put('/master/updatekmdetails', service.updateKmMaster);

    /* Stock Master */
    app.get('/master/getstock', service.getStockDetails);
    app.put('/master/updatestock', service.updateStockDetails);

    /* Social Media Links Master */
    app.post('/master/addsocialmedialinks', service.addSocialLinks);
    app.get('/master/getsocialmedialinks', service.getSocialLinks);
    app.put('/master/updatesocialmedialinks', service.updateSocialLinks);

    /* Notification Master */
    app.post('/master/addnotification', service.addNotification);
    app.get('/master/getnotification', service.getNotification);
    app.put('/master/updatenotification', service.updateNotification);

    /* Merchandise Category Master */
    app.post('/master/addmerchandisecategory', service.addMerchandiseCat);
    app.get('/master/getmerchandisecategory', service.getMerchandiseCat);
    app.put('/master/updatemerchandisecategory', service.updateMerchandiseCat);

    /* Autoline Color Master */
    app.get('/master/getautolinecolor', service.getAutolineColor);

    /* CEM Color Master */
    app.post('/master/addcolor', service.addColor);
    app.get('/master/getcolor', service.getColor);
    app.put('/master/updatecolor', service.updateColor);

    /* Autoline Color Map */
    app.post('/master/addcolormap', service.addColorMap);
    app.put('/master/updatecolormap', service.updateColorMap);

    /* Monthly News Master */
    app.post('/master/addmonthlynews', service.addMonthlyNews);
    app.get('/master/getmonthlynews', service.getMonthlyNews);
    app.put('/master/updatemonthlynews', service.updateMonthlyNews)

    /* Monthly Magazine Master */
    app.post('/master/addmagazine', service.addMonthlyMagazine);
    app.get('/master/getmagazine', service.getMonthlyMagazine);
    app.put('/master/updatemagazine', service.updateMonthlyMagazine);

    //Service master 
    app.post('/master/addservice', service.addService);
    app.get('/master/getservice', service.getServices);
    app.put('/master/updateservice', service.updateService);

    //service type master
    app.post('/master/addservicetype', service.addServiceType);
    app.get('/master/getservicetype', service.getServiceType);
    app.put('/master/updateservicetype', service.updateServiceType)

    //Autoline status master
    app.get('/master/getautolinestatus', service.getAutolineStatus);
    
    //CEM Status Master
    app.post('/master/addstatus', service.addStatus);
    app.get('/master/getstatus', service.getStatus);
    app.put('/master/updatestatus', service.updateStatus);

    //ON-OFF Master
    app.get('/master/getsubmenuitems', service.getSubMenu);
    app.get('/master/getactions', service.getActions);
    app.post('/master/mapactions', service.mapActions);

    // Payment Matrix Master
    app.post('/master/addpaymentmatrix', service.addPaymentMatrix);
    app.get('/master/getpaymentmatrix', service.getPaymentMatrix);
    app.put('/master/updatepaymentmatrix', service.updatePaymentMatrix);

    //CPOV Specification Master
    app.post('/master/addcpovspecs', service.addCpovSpecs);
    app.get('/master/getcpovspecs', service.getCpovSpecs);
    app.put('/master/updatecpovspecs', service.updateCpovSpecs);

    //FAQ Type Master
    app.post('/master/addfaqtype', service.addFaqType);
    app.get('/master/getfaqtype', service.getFaqType);
    app.put('/master/updatefaqtype', service.updateFaqType);

    //FAQ Master
    app.post('/master/addfaqs', service.addFaqs);
    app.get('/master/getfaqs', service.getFaqs);
    app.put('/master/updatefaqs', service.updateFaqs);
}