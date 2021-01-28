let mongoose = require('mongoose')

mongoose.Promise = global.Promise

module.exports =  (config) => {

	mongoose.connect(config.db)
	let db = mongoose.connection

	db.once('open', (err) => {
		if (err) {
			console.log(err)
			//write to log file
		} else {
			console.log('Mongo connection established')
		}
	})
 	db.on('error', (err) => {
		if (err) {
			console.log(err)
			//write to log file
		}
  })
  

}