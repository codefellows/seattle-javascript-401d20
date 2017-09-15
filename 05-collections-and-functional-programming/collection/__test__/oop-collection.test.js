'use strict'

const Collection = require('../lib/oop-collection.js')

describe('oop collection', () => {
  describe('constructor', () => {
    test('the instance should have a length of 0', () => {
      let result = new Collection()
      expect(result.length).toEqual(0)
    })
  })

  describe('#append', () => {
    test('it should append a value using a contiguous index', () => {
      let col = new Collection()
      col.append(2)
      expect(col.length).toEqual(1)
      expect(col[0]).toEqual(2)

      col.append(3)
      expect(col.length).toEqual(2)
      expect(col[0]).toEqual(2)
      expect(col[1]).toEqual(3)
    })
  })

  describe('#prepend', () => {
    test('it should prepend a value using a contiguous index', () => {
      let col = new Collection()
      col.prepend(2)
      expect(col.length).toEqual(1)
      expect(col[0]).toEqual(2)

      col.prepend(10)
      expect(col.length).toEqual(2)
      expect(col[0]).toEqual(10)
      expect(col[1]).toEqual(2)
    })
  })

  describe('#get', () => {
    test('it should prepend a value using a contiguous index', () => {
      let col = new Collection()
      col.append(11)
      col.append(22)
      col.append(33)

      expect(col.get(0)).toEqual(11)
      expect(col.get(1)).toEqual(22)
      expect(col.get(2)).toEqual(33)

      

    })
  })
})





