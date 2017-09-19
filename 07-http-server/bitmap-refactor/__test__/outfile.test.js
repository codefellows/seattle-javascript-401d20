'use strict'

const outfile = require('../lib/outfile.js')

describe('outfile', () => {
  test('an invalid path should reject an error', (done) => {
    outfile(`${__dirname}/asset/foo.bmp`, (err, data) => {
      expect(err).not.toBeNull();
      expect(data).toBeUndefined();
      done();
    })
  })

 test('a valid path should resolve data', (done) => {
    outfile(`${__dirname}/../asset/house.bmp`, (err, data) => {
      expect(err).toBeNull();
      expect(data).toEqual(null);
      done();
    })
  })
})