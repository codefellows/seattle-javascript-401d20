'use strict'

const greet = require('../lib/greet.js')

test('greet() should return "hello world"', () => {
  let result = greet()
  expect(result).toEqual('hello world')
})

test('greet(\'slugbyte\') should return "hello slugbyte"', () => {
  let result = greet('slugbyte')
  expect(result).toEqual('hello slugbyte')
})
