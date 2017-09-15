'use strict'

const collection = require('../lib/fp-collection.js')

describe('fp collection', () => {

  describe('#create', () => {
    test('should have a length of 0', () => {
      let result = collection.create()
      expect(result.length).toEqual(0)
    })
  })

  describe('#append', () => {
    test('should immutably append values to the collection', () => {
      let col = collection.create()

      let result = collection.append(3, col)
      expect(col.length).toEqual(0)
      expect(result.length).toEqual(1)
      expect(result[0]).toEqual(3)
    })
  })
})
