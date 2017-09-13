'use strict'

const fs = require('fs')

module.exports = (path, callback) => {
  fs.readFile(path, (err, data) => {
    if(err) 
      return callback(err)
    callback(null, data.toString().toUpperCase())
  })
}
