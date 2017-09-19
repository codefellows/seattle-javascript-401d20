'use strict'

const infile = require('../lib/infile.js')

describe('infile', () => {
  test('an invalid path should reject an error', (done) => {
    infile(`${__dirname}/asset/foo.bmp`, (err, data) => {
      expect(err).not.toBeNull();
      expect(data).toBeUndefined();
      done();
    })
  })

  test('a valid path should resolve data', (done) => {
    infile(`${__dirname}/../__test__/asset/house.bmp`, (err, data) => {
      expect(err).toBeNull();
      expect(data).toBeDefined();
      done();
    })
  })
})
