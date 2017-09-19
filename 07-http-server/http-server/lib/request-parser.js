'use strict'

const url = require('url')
const queryString = require('querystring')

// a promise is an object that manages sync and async callbacks 
// with a consistant interface
// use then and catch methods to handle success and failures
module.exports = (req) => {
  return new Promise((resolve, reject) => {
    req.url = url.parse(req.url)
    req.url.query = queryString.parse(req.url.query)

    if(!(req.method === 'POST' || req.method === 'PUT'))
      return resolve(req)

    let text = ''
    // ONLY PARSER THE POST OR PUT REQUEST BODYS
    req.on('data', (buffer) => {
      text += buffer.toString()
    })
    req.on('end', () => {
      try {
        req.body = JSON.parse(text)
        resolve(req)
      } catch (err) {
        reject(err)
      }
    })
  })
}

