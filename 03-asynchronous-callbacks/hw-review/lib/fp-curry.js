'use strict'

fp = module.exports = {}

fp.map = (callback) => (collection) => {
  if(!collection.length)
    throw new Error('expected array like object')
  return Array.prototype.map.call(collection, callback)
}

notes = [
  'go to store',
  'get food', 
  'cook dinner',
]

fp.map(n => n * 2)([1,2, 3])

upperCase = fp.map(i => i.toUpperCase())

stoked = fp.map(i => i + '!!!')

upperCase(stoked(notes))

fp.map((i), i.toUpperCase(), fp.map(i => i + '!!!', notes))




