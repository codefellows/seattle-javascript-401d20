'use strict'

// load environment
require('dotenv').config()

// load dependencies
const server = require('./lib/server.js')

// start server
server.start(process.env.PORT, () => 
  console.log('server up ::', process.env.PORT))
