'use strict'

const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')

// connect to the database
mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true})

const app = express()
let isOn = false
let http = null

// register appwide middlware
app.use(cors({ origin: process.env.ORIGIN_URL })) // browser request support
app.use(morgan('dev')) // logger middleware

// register resource routes
app.use(require('../route/category-router.js'))
// register a 404 route
app.all('*', (req, res) => res.sendStatus(404))
// error middleware
app.use(require('./error-middleware.js'))

// export interface
module.exports = {
  start: () => {
    return new Promise((resolve, reject) => {
      if(isOn)
        return reject(new Error('__SERVER_ERROR_ server is allready on'))
      http = app.listen(process.env.PORT, () => {
        isOn = true
        console.log('__SERVER_ON__', process.env.PORT)
        resolve()
      })
    })
  },
  stop: () => {
    return new Promise((resolve, reject) => {
      if(!isOn)
        return reject(new Error('__SERVER_ERROR_ server is allready off'))
      if(!http)
        return reject(new Error('__SERVER_ERROR_ server does not exist'))
      http.close(() => {
        isOn = false
        http = null
        console.log('__SERVER_OFF__')
        resolve()
      })
    })
  },
}








