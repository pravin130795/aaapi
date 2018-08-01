let service = require('./master-service');

module.exports = function (app) {
    // APIs for Designation Master

    //To create new designation for user
    app.post('/master/adddesignation', service.addDesignation);

    //To get designation list
    app.get('/master/getdesignation', service.getDesignation);
    
    //To update designation details
    app.put('/master/updatedesignation',service.updateDesignation);
}