'use strict'

const reader = require('../lib/reader.js')

describe('reader', () => {
  test('an invalid path should reject an error', (done) => {
    reader(`${__dirname}/asset/wat.txt`, (err, data) => {
      expect(err).not.toBeNull()
      expect(data).toBeUndefined()
      done()
    })
  })

  test('a valid path should resolve an uppercased string', (done) => {
    reader(`${__dirname}/asset/lulwat.txt`, (err, data) => {
      expect(err).toBeNull()
      expect(data).toEqual('LULWAT\n')
      done()
    })
  })
})
