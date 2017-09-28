'use strict'

// crossite origin resource scripting
// Access-Control-Allow-Origin: server://codefellows.com
// Access-Control-Allow-Headers: X-Slugram-Token, Content-Type
// Access-Control-Allow-Credentails: Cookies
// Access-Control-Allow-Methods: HEAD, PUT
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
// tell mongoose to support promises
mongoose.Promise = Promise

const app = express()
let server = null 

// register appwide middlware
app.use(cors({ origin: process.env.ORIGIN_URL })) // browser request support
app.use(morgan('dev')) // logger middleware

// register resource routes
app.use(require('../route/category-router.js'))
app.use(require('../route/card-router.js'))
// register a 404 route
app.all('*', (req, res) => res.sendStatus(404))
// error middleware
app.use(require('./error-middleware.js'))

// export interface
module.exports = {
  start: () => {
    return new Promise((resolve, reject) => {
      if(server)
        return reject(new Error('__SERVER_ERROR_ server is allready on'))
      server = app.listen(process.env.PORT, () => {
        console.log('__SERVER_ON__', process.env.PORT)
        resolve()
      })
    })
    .then(() => mongoose.connect(process.env.MONGODB_URI))
  },
  stop: () => {
    return new Promise((resolve, reject) => {
      if(!server)
        return reject(new Error('__SERVER_ERROR_ server is allready off'))
      server.close(() => {
        server = null
        console.log('__SERVER_OFF__')
        resolve()
      })
    })
    .then(() => mongoose.disconnect())
  },
}








