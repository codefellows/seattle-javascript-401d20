'use strict'

const faker = require('faker')
const accountMock = require('./account-mock.js')
const Sample = require('../../model/sample.js')

// resolves a {tempAccount, sample}
const create = () => {
  let result = {}
  return accountMock.create()
  .then( accountMock  => {
    result.tempAccount = accountMock
    return new Sample({
      account: accountMock.account._id,
      title: faker.lorem.words(10),
      url: faker.image.image(),
    }).save()
  })
  .then(sample => {
    result.sample = sample
    return result
  })
}

const remove = () => {
  return Promise.all([
    accountMock.remove,
    Sample.remove({}),
  ])
}

module.exports = { create, remove }

