'use strict'
// load env
require('dotenv').config()
// assert env
require('./src/lib/assert-env.js')
// start server
// every require after babel register can user babelifyed ES6 
require('babel-register')
require('./src/main.js')
