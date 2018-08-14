let service = require('./user-service');
let verifier = require('../../middlewares/sessionMidleware');

module.exports = function (app) {

    // APIs for User Management
    // To Add user details
    app.post('/user/adduser', verifier.verifyToken, service.addUser);

    // To get Users Lists
    app.get('/user/getuser', verifier.verifyToken, service.getUsers);

    //To update user details
    app.put('/user/updateuser', verifier.verifyToken, service.updateUser);

    // User login 
    app.post('/user/login', service.userLogin);
    
}