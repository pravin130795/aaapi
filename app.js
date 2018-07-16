var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get( '/', function(reqst, resp) {
    let userDetails = {username: 'Alan', version: 1.0}
    resp.render("home", {data: userDetails});
});

app.listen(8081, function () {
    console.log('App listening on port 8081!');
});