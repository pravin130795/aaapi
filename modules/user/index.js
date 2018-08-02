let service = require('./user-service');

module.exports = function (app) {
   
    // APIs for User Management
    
    // To Add user details
    app.post('/adduser', service.addUser);
    
    
    
    // app.get('/users', service.getUsers);
    // app.put('/updateuser', service.updateUser);

}