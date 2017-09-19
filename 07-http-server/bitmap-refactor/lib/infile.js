'use strict'

const fs = require('fs')
const Bitmap = require('./bitmap.js')

// reads a file and resolve a Bitmap object
module.exports = (path, callback) => {
  fs.readFile(path, (err, buffer) => {
    if(err) return callback(err)
    try {
      let bitmap = new Bitmap(buffer)
      callback(null, bitmap)
    } catch (err){
      callback(err)
    }
  })
}

