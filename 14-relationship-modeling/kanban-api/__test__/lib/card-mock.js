'use strict'

const faker = require('faker')
const categoryMock = require('./category-mock.js')
const Card = require('../../model/card.js')

let create = () => {
  let result = {}
  return categoryMock.create()
  .then(category => {
    result.category = category
    return new Card({
      content: faker.lorem.words(7),
      category: category._id,
    }).save()
  })
  .then(card => {
    result.card = card
    return result
  })
}

let createMany = (num) => {
  let result = {}
  return categoryMock.create()
  .then(category => {
    result.category = category
    return Promise.all(new Array(num).fill(0)
    .map(() => { 
      return new Card({
        content: faker.lorem.words(7),
        category: category._id,
      }).save()
    }))
  })
  .then(cards => {
    result.cards = cards
    return result
  })
}

let remove = () => Promise.all([
  Card.remove({}),
  categoryMock.remove(),
])

module.exports = {create, createMany, remove}
