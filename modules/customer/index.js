const path = require('path')
let service = require('./customer-service');

module.exports = function (app) {
    // To Insert Customer Details To Database
    app.post('/customer/addcustomerdetails', service.addCustomerDetails);

    app.get('/hello', function (req, res) {
        let name = "parth"
        res.json({ firstName: name });
        res.end();
    });
}