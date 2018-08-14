﻿// Import required external node modules
const http = require('http');
const express = require('express');
const util = require('util');
const cors = require('cors');
const config = require('./configurations/config');
const logger = require('./utils/logger');
const middlewares = require('./middlewares/index');
const routes = require('./routes/index');
const db = require('./database/sql');
let app = express();

//Global Variable Declarations
global.sqlInstance = db;

//use cors
app.use(cors());

// set port.
app.set('port', config.get('server.port'));

// required to get client IP when running via reverse proxy (HA proxy)
app.set('trust proxy', true);

// setup middlewares
middlewares(app);

// setup routes
routes(app);

// start http server
let server = http.createServer(app).listen(app.get('port'), function () {
	logger.info(util.format('ALGHANIM api server with pid: %s listening on port: %s', process.pid, app.get('port')));
	logger.info(util.format('Environment: %s', config.get('env')));
});

process.on('uncaughtException', function (e) {
	logger.error(util.format('uncaught exception:- ', e.stack));
});

server.timeout = 600000;