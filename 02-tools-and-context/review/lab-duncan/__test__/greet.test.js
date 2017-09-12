'use strict'

const greet = require('../lib/greet.js')

test('expect witn non string values to return null', () => {
  expect(greet()).toBe(null)
  expect(greet([])).toBe(null)
  expect(greet({})).toBe(null)
  expect(greet(123)).toBe(null)
  expect(greet(NaN)).toBe(null)
  expect(greet(null)).toBe(null)
  expect(greet(true)).toBe(null)
})

test('expect greet with a string value to return "hello " + value', () => {
  expect(greet('world')).toBe('hello world')
  expect(greet('')).toBe('hello ')
  expect(greet('slugbyte')).toBe('hello slugbyte')
})
