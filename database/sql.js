const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelizeTransforms = require('sequelize-transforms');
const config = require('../configurations/config');

let sequelize = new Sequelize(config.get('sql.database'), config.get('sql.username'), config.get('sql.password'), config.get('sql'));
let db = {};
sequelizeTransforms(sequelize);
//To Read All Files from the database directory and we will exclude index.js from the directory
fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0 && file !== "index.js")
    })
    .forEach(function (file) {
        let model = sequelize.import(path.join(__dirname, file));
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;