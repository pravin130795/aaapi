﻿module.exports = function (app) {
	require('../modules/customer/index')(app);
	require('../modules/master/index')(app);

};