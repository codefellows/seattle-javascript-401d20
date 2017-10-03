'use strict'

const fs = require('fs')

// solve for three files
// create a function that takes in an array of files
// an returns a promises that will
//  * on success resolve an array of text mapping the file contents
//  * on failure resolve an error
module.exports = (paths) => {
  return new Promise((resolve, reject) => {
    let result = []
    fs.readFile(paths[0], (err, data) => {
    // handle error
    if(err) return reject(err)
    // handle success 
    result.push(data.toString())
      fs.readFile(paths[1], (err, data) => {
      // handle error
      if(err) return reject(err)
      // handle success 
      result.push(data.toString())
        fs.readFile(paths[2], (err, data) => {
        // handle error
        if(err) return reject(err)
        // handle success 
        result.push(data.toString())
        resolve(result)
        })
      })
    })
  })
}
