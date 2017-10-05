'use strict'

// requires setup
require('./lib/setup.js')
// requre npm 
const superagent = require('superagent')
// app modules
const server = require('../lib/server.js')
const accountMock = require('./lib/account-mock.js')

const sampleMock = require('./lib/sample-mock.js')
// test globals
const apiURL = `http://localhost:${process.env.PORT}`
// tests

describe('/samples', () => {
  beforeAll(server.start)
  afterAll(server.stop)
  afterEach(sampleMock.remove)

  test('POST /samples  200', () => {
    let tempAccountMock
    return accountMock.create()
    .then(accountMock => {
      tempAccountMock = accountMock
      return superagent.post(`${apiURL}/samples`)
      .set('Authorization', `Bearer ${accountMock.token}`)
      .field('title', 'dunk says booyea')
      .attach('sample', `${__dirname}/asset/booyeah.m4a`)
      .then(res => {
        expect(res.status).toEqual(200)
        expect(res.body.title).toEqual('dunk says booyea')
        expect(res.body._id).toBeTruthy()
        expect(res.body.url).toBeTruthy()
        expect(res.body.account).toEqual(tempAccountMock.account._id.toString())
      })

    })
  })

  test('GET /samples 200', () => {
    let tempMock 
    return sampleMock.create()
    .then(mock => {
      tempMock = mock
      return superagent.get(`${apiURL}/samples/${mock.sample._id}`)
      .set('Authorization', `Bearer ${mock.tempAccount.token}`)
      .then(res => {
        expect(res.status).toEqual(200)
        expect(res.body.url).toEqual(tempMock.sample.url)
        expect(res.body.title).toEqual(tempMock.sample.title)
        expect(res.body._id).toEqual(tempMock.sample._id.toString())
        expect(res.body.account).toEqual(tempMock.tempAccount.account._id.toString())
      })
    })
  })
})
