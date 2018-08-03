let service = require('./user-service');

module.exports = function (app) {
   
    // APIs for User Management
    
    // To Add user details
    app.post('/adduser', service.addUser);
    
    // To get Users Lists
     app.get('/users', service.getUsers);

    //To update user details
     app.put('/updateuser', service.updateUser);

}