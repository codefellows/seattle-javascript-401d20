'use strict'

const fs = require('fs')

const promisify = (fn) => (...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, (err, data) => {
      if(err) return reject(err)
      resolve(data)
    })
  })
}

let readfile = promisify(fs.readFile)

module.exports = (paths) => {
  // create an array of promises that read each path
  let readfilePromises = paths.map(path => readfile(path))

  // run each promise using Promise.all 
  return Promise.all(readfilePromises)
  .then(buffers => buffers.map(buffer => buffer.toString()))
}
