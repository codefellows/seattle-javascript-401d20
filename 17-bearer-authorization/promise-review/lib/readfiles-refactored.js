'use strict'

const fs = require('fs')

const readfile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if(err) return reject(err)
      resolve(data)
    })
  })
}

module.exports = (paths) => {
  // create an array of promises that read each path
  let readfilePromises = paths.map(path => readfile(path))

  // run each promise using Promise.all 
  return Promise.all(readfilePromises)
  .then(buffers => buffers.map(buffer => buffer.toString()))
}
