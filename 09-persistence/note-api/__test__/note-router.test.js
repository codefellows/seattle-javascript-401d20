'use strict'

// mock env 
process.env.PORT = 7000
process.env.STORAGE_PATH = `${__dirname}/test-storage.json`

const server = require('../lib/server.js')
const superagent = require('superagent')

describe('/api/notes', ()=> {
  afterAll(server.stop)
  beforeAll(server.start)

  describe('POST /api/notes', () => {
    test('should respond with a 200', () => {
      return superagent.post('http://localhost:7000/api/notes')
      .set('Content-Type', 'application/json')
      .send({
        title: 'hello world', 
        content: 'cool beans',
      })
      .then(res => {
        expect(res.status).toEqual(200)
        expect(res.body.title).toEqual('hello world')
        expect(res.body.content).toEqual('cool beans')
        expect(res.body.timestamp).toBeTruthy()
        expect(res.body.id).toBeTruthy()
      })
    })

    test('should resoind with a 400', () => {
      return superagent.post('http://localhost:7000/api/notes')
      .set('Content-Type', 'application/json')
      .send({
        content: 'cool beans',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400)
      })
    })

    test('should resoind with a 400', () => {
      return superagent.post('http://localhost:7000/api/notes')
      .set('Content-Type', 'application/json')
      .send({
        title: 'hello world',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400)
      })
    })
  })

  describe('GET /api/notes', () => {
    test('should return an array', () => {
      return superagent.get('http://localhost:7000/api/notes')
      .then(res => {
        console.log(res.body)
        expect(res.status).toEqual(200)
        expect(res.body). toBeInstanceOf(Array)
      })
    })
  })
})
