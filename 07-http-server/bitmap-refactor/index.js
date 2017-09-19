'use strict'

const infile = require('./lib/infile.js')
const outfile = require('./lib/outfile.js')
const transforms = require('./lib/transforms.js')

let debug = (err, message) => {
  if(process.env.DEBUG)
    return console.error(err)
  console.error(message)
}

if (process.argv[2] && process.argv[3] && process.argv[4]) {
  // grabs user input
  let inputPath = process.argv[2]
  let outputPath = process.argv[3]
  let transform = process.argv[4]
  // read file -> transform -> write file
  //readfile
  infile(inputPath, (err, bitmap) => {
    if(err) 
      return debug(err, 'There was a problem loading the input file')

    try {
      transforms[transform](bitmap)
    } catch (err) {
      return debug(err, 'There was a problem running the image tranform')
    }

    outfile(outputPath, bitmap, (err) => {
      if(err) 
        return debug(err, 'There was a problem writing the file')
      console.log('done')
    })
  })
} else {
  console.error('USAGE ERROR: infile, outfile, and transform arguments required')
}
