'use strict'

const fp = module.exports = {}

fp.map = (callback, collection) => {
  if(!collection.length)
    throw new Error('expected array like object')
  return Array.prototype.map.call(collection, callback)
}

fp.reduce = (...args) => {
  //[cb, collection]
  //[cb, intialValue, collection]
  console.log('args', args)
  let collection = args.splice(-1)[0]
  return Array.prototype.reduce.apply(collection, args)
}
