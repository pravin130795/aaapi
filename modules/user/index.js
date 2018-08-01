let service = require('./user-service');

module.exports = function (app) {
    app.get('/users', service.getUsers);
    app.post('/adduser', service.addUser);
    app.put('/updateuser', service.updateUser);

}