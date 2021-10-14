// const express = require('express')
const dbOperations = require('./app/services/databaseServices/dbOperations')

const environment = process.env.NODE_ENV || "dev"

const config = require('./app/config/config')[environment]
require('./app/config/database')(config)

const a = require('./app/services/queueService')(config)

console.log(`listening on port ${config.port} on ${environment} environment `)
console.log(`DB at ` + process.env.db)