// const express = require('express')
const dbOperations = require('./app/services/databaseServices/dbOperations')
const Queue = require('bull');


const environment = process.env.NODE_ENV || "dev"

// let app = express()

const config = require('./app/config/config')[environment]
 require('./app/config/database')(config)
//.then((db) => {
//   console.log(db)
// })
const a = require('./app/services/queueService')(config)



console.log(`listening on port ${config.port} on ${environment} environment `)


