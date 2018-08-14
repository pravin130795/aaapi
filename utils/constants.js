let constants = {
	messageKeys: {
		code_4001: 'Incomplete/Incorrect Request Data.',
		code_4003: 'Unauthorized User. Please Login to continue.',
		code_2005: 'Invalid Username/Password',
		code_4010: 'Error While Generating User Token',
		code_4011: 'Unable to Set Cookie On Web App',
		code_5000: 'Unsuccessful Operation',
		code_2000: 'Successful Operation'
	},
	tables: {
		userTable: 'user'
	},
	moduleNames: {
		customer: 'customer',
		model: 'models',
		user: 'user',
		role: 'role',
		master: 'master',
		accessories: 'accessories',
		merchandise: 'merchandise',
		accessories: 'accessories'
	},
	JWT_TOKEN: {
		SECRET: "jwt secret",
		ALGORITHM: "HS512",
		expireTime: "1d"
	},
	booleanValue: {
		true: true,	
		false: false
	},
	ttl: 86400000,
	webAppUrl: {
		setToken: 'settoken'
	},
	externalStatusCodes: {
		success: 200
	}
};

module.exports = constants;