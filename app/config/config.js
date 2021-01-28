const path = require('path')
let rootPath = path.normalize(path.join(__dirname, '/../../'))

module.exports = {
	dev: {
		rootPath: rootPath,
		db: 'mongodb://localhost:27017/email_definitions',
		port: 5555,
		redis: {
			host: '127.0.0.1',
			port: 6379
		},
		bullQueueName: "sendMail",
		mailgun: {
			domain:"******",
			apiKey:"*****",
			to: "******"
		},
		schedulerTimeout:10000
	},
	dev_cloud: {
		rootPath: rootPath,
		port: process.env.PORT,
		db: '*******'
	},
	staging: {
		rootPath: rootPath,
		db: process.env.MONGO_DB_CONN_STRING_STAG,
		port: process.env.PORT
	},
	production: {
		rootPath: rootPath,
		db: process.env.MONGO_DB_CONN_STRING,
		port: process.env.PORT
	}
}