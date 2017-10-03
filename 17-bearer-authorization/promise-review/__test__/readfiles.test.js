'use strict'

//const readfiles = require('../lib/readfiles.js')
//const readfiles = require('../lib/readfiles-refactored.js')
const readfiles = require('../lib/readfiles-promisified.js')

test('should return array of file contents', () => {
  let paths = [
    `${__dirname}/../data/a.txt`,
    `${__dirname}/../data/b.txt`,
    `${__dirname}/../data/c.txt`,
  ]

  return readfiles(paths)
  .then(contents => {
    expect(contents).toEqual([
      'hello from a\n',
      'hello from b\n',
      'hello from c\n',
    ])
  })
})
