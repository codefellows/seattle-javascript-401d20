'use strict'

const fs = require('fs')

module.exports = (path, bitmap, callback) => {
  fs.writeFile(path, bitmap.buffer, (err) => {
    if (err) return callback(err)
    callback()
  })
}
