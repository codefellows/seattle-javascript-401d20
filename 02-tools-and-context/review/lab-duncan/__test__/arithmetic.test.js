'use strict'

const arithmetic = require('../lib/arithmetic.js')

describe('#add', () => {
  test('add should return null with non number arguments', () => {
    expect(arithmetic.add(1, 'hello')).toBe(null)
    expect(arithmetic.add('hello', 1 )).toBe(null)
    expect(arithmetic.add(1, [])).toBe(null)
    expect(arithmetic.add([], 1 )).toBe(null)
    expect(arithmetic.add(1, undefined)).toBe(null)
    expect(arithmetic.add(1, null)).toBe(null)
    expect(arithmetic.add(null, 1 )).toBe(null)
    expect(arithmetic.add(1, {})).toBe(null)
    expect(arithmetic.add({}, 1 )).toBe(null)
    expect(arithmetic.add(1, true)).toBe(null)
    expect(arithmetic.add(true, 1 )).toBe(null)
    expect(arithmetic.add()).toBe(null)
  })

  test('add should return the sum of the first two arguments', () => {
    expect(arithmetic.add(1, 2)).toEqual(3)
    expect(arithmetic.add(1, 2, 2)).toEqual(3)
  })
})


describe('#sub', () => {
  test('sub should return null with non number arguments', () => {
    expect(arithmetic.sub(1, 'hello')).toBe(null)
    expect(arithmetic.sub('hello', 1 )).toBe(null)
    expect(arithmetic.sub(1, [])).toBe(null)
    expect(arithmetic.sub([], 1 )).toBe(null)
    expect(arithmetic.sub(1, undefined)).toBe(null)
    expect(arithmetic.sub(1, null)).toBe(null)
    expect(arithmetic.sub(null, 1 )).toBe(null)
    expect(arithmetic.sub(1, {})).toBe(null)
    expect(arithmetic.sub({}, 1 )).toBe(null)
    expect(arithmetic.sub(1, true)).toBe(null)
    expect(arithmetic.sub(true, 1 )).toBe(null)
    expect(arithmetic.sub()).toBe(null)
  })

  test('sub should return the sum of the first two arguments', () => {
    expect(arithmetic.sub(1, 2)).toEqual(-1)
    expect(arithmetic.sub(1, 2, 2)).toEqual(-1)
  })
})
