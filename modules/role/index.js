let service = require('./role-service');

module.exports = function (app) {
   
    // APIs for Role Management
    
    // To get list of role details
    app.get('/roles', service.getRolesLists);

    // To add new role with role permission
    app.post('/role/add', service.addRole);

    // To update role details and role permission
    app.put('/role/update', service.updateRole);
}