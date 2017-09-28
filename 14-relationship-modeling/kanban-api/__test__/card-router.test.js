'use strict'

require('./lib/setup.js')

const superagent = require('superagent')
const server = require('../lib/server.js')
const cardMock = require('./lib/card-mock.js')
const categoryMock = require('./lib/category-mock.js')

const apiURL = `http://localhost:${process.env.PORT}`

describe('/cards', () => {
  beforeAll(server.start)
  afterAll(server.stop)
  afterEach(cardMock.remove)

  describe.only('POST /cards/id', () => {
    test('should return 200 and a card', () => {
      let tempMock
      return categoryMock.create()
      .then(mock  => {
        tempMock = mock
        return superagent.post(`${apiURL}/cards`)
        .send({
          content: 'hello world',
          category: mock._id,
        })
      })
      .then(res => {
        console.log(res.body)
        expect(res.status).toEqual(200)
        expect(res.body._id).toBeTruthy()
        expect(res.body.timestamp).toBeTruthy()
        expect(res.body.category).toEqual(tempMock._id.toString())
        expect(res.body.content).toEqual('hello world')
      })
    })

    test('should return 404 ', () => {
      return superagent.post(`${apiURL}/cards`)
      .send({
        content: 'hello world',
        category: 'badid',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404)
      })
    })
  })

  describe('GET /cards/:id', () => {
    test('should return 200 and a card', () => {
      let tempMock
      return cardMock.create()
      .then(mock  => {
        tempMock = mock
        return superagent.get(`${apiURL}/cards/${mock.card._id}`)
      })
      .then(res => {
        console.log(res.body)
        expect(res.status).toEqual(200)
        expect(res.body._id).toEqual(tempMock.card._id.toString())
        expect(res.body.content).toEqual(tempMock.card.content)
        expect(res.body.timestamp).toEqual(tempMock.card.timestamp.toJSON())
        expect(res.body.category._id).toEqual(tempMock.category._id.toString())
        expect(res.body.category.title).toEqual(tempMock.category.title)
        expect(JSON.stringify(res.body.category.keywords))
          .toEqual(JSON.stringify(tempMock.category.keywords))
      })
    })
  })
})
