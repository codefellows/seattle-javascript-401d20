'use strict'

require('./lib/setup.js')
const superagent = require('superagent')
const server = require('../lib/server.js')
const accountMock = require('./lib/account-mock.js')

const apiURL = `http://localhost:${process.env.PORT}`

console.log('apiURL', apiURL)
describe('AUTH router', () => {
  beforeAll(server.start)
  afterAll(server.stop)
  afterEach(accountMock.remove)

  test('POST /signup with 200', () => {
    return superagent.post(`${apiURL}/signup`)
    .send({
      username: 'slorg', 
      email: 'slorg@example.com', 
      password: 'topsecret', 
    })
    .then(res => {
      expect(res.status).toEqual(200)
      expect(res.body.token).toBeTruthy()
    })
  })

  test('POST /signup with 400', () => {
    return superagent.post(`${apiURL}/signup`)
    .send({
      email: 'slorg@example.com', 
      password: 'topsecret', 
    })
    .then(Promise.reject)
    .catch(res => {
      expect(res.status).toEqual(400)
    })
  })
})







