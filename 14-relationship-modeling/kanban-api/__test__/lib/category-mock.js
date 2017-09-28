'use strict'

const faker = require('faker')
const Category = require('../../model/category.js')

let create = () => {
  return new Category({
    title: faker.lorem.words(7),
    keywords: faker.lorem.words(5).split(' '),
  }).save()
}

let createMany = (num) => {
  return Promise.all(new Array(num).fill(0).map(() => categoryMockCreate()))
}

let remove = () => Category.remove({})

module.exports = {create, createMany, remove}
