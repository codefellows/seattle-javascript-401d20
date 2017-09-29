'use strict'

const StackConstructor = require('../lib/stack-constructor.js')
const stackFactory = require('../lib/stack-factory.js')
const stackLinkedList = require('../lib/stack-linked-list.js')

const getStack = () => stackLinkedList()

describe('stack', () => {
  describe('#push and #pop', () => {
    test('the stack should have a first in last out behavior', () => {
      let stack = getStack()
      stack.push(1)
      stack.push(2)
      stack.push(3)
      expect(stack.pop()).toEqual(3)
      expect(stack.pop()).toEqual(2)
      expect(stack.pop()).toEqual(1)
      expect(stack.pop()).toEqual(undefined)
    })
  })
})
