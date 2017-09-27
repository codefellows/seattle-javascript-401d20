'use strict'

// mock the env
process.env.PORT = 7000
process.env.CORS_ORIGIN = 'http://localhost:8080'
process.env.MONGODB_URI = 'mongodb://localhost/testing'

const faker = require('faker')
const superagent = require('superagent')
const server = require('../lib/server.js')
const Category = require('../model/category.js')

let apiURL = `http://localhost:${process.env.PORT}`

let categoryMockCreate = () => {
  return new Category({
    title: faker.lorem.words(7),
    keywords: faker.lorem.words(5).split(' '),
  }).save()
}

let categoryMockCreateMany = (num) => {
  return Promise.all(new Array(num).fill(0).map(() => categoryMockCreate()))
}

describe('/categories', () => {
  beforeAll(server.start)
  afterAll(server.stop)
  afterEach(() => Category.remove({}))
  
  describe('POST /categories', () => {
    test('200', () => {
      return superagent.post(`${apiURL}/categories`)
      .send({
        title: 'shark in the dark',
        keywords: ['cool', 'beans'],
      })
      .then(res => {
        expect(res.status).toEqual(200)
        expect(res.body._id).toBeTruthy()
        expect(res.body.timestamp).toBeTruthy()
        expect(res.body.title).toEqual('shark in the dark')
        expect(res.body.keywords).toEqual(['cool', 'beans'])
      })
    })

    test('409 due to lack duplicate title', () => {
      return categoryMockCreate()
      .then(category => {
        return superagent.post(`${apiURL}/categories`)
        .send({
          title: category.title,
          keywords: [],
        })
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(409)
      })
    })

    test('400 due to lack of title', () => {
      return superagent.post(`${apiURL}/categories`)
      .send({})
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400)
      })
    })

    test('400 due to bad json', () => {
      return superagent.post(`${apiURL}/categories`)
      .set('Content-Type', 'application/json')
      .send('{')
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400)
      })
    })
  })

  describe('PUT /categories/:id', () => {
    test('200', () => {
      let tempCategory 
      return categoryMockCreate()
      .then(category => {
        tempCategory = category
        return superagent.put(`${apiURL}/categories/${category._id}`)
        .send({
          title: 'shark in the dark',
          keywords: ['cool', 'beans'],
        })
      })
      .then(res => {
        expect(res.status).toEqual(200)
        expect(res.body._id).toEqual(tempCategory._id.toString())
        expect(res.body.timestamp).toBeTruthy()
        expect(res.body.title).toEqual('shark in the dark')
        expect(res.body.keywords).toEqual(['cool', 'beans'])
      })
    })
  })

  describe('GET /categories/:id', () => {
    test('200', () => {
      let tempCategory 
      return categoryMockCreate()
      .then(category => {
        tempCategory = category
        return superagent.get(`${apiURL}/categories/${category._id}`)
      })
      .then(res => {
        expect(res.status).toEqual(200)
        expect(res.body._id).toEqual(tempCategory._id.toString())
        expect(res.body.timestamp).toBeTruthy()
        expect(res.body.title).toEqual(tempCategory.title)
        expect(JSON.stringify(res.body.keywords)).toEqual(JSON.stringify(tempCategory.keywords))
      })
    })
  })

  describe('DELETE /categories/:id', () => {
    test('200', () => {
      let tempCategory 
      return categoryMockCreate()
      .then(category => {
        tempCategory = category
        return superagent.delete(`${apiURL}/categories/${category._id}`)
      })
      .then(res => {
        expect(res.status).toEqual(204)
      })
    })
  })


})















