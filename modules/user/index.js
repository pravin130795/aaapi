let service = require('./user-service');

module.exports = function (app) {
   
    // APIs for User Management
    
    // To Add user details
    app.post('/user/adduser', service.addUser);
    
    // To get Users Lists
     app.get('/user/users', service.getUsers);

    //To update user details
     app.put('/user/updateuser', service.updateUser);

    // User login 
    app.post('/user/login',service.userLogin);
}