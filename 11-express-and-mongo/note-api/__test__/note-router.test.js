'use strict'

// mock env
process.env.PORT = 7000
process.env.MONGODB_URI = 'mongodb://localhost/testing'

const faker = require('faker')
const superagent = require('superagent')
const Note = require('../model/note.js')
const server = require('../lib/server.js')

const apiURL = `http://localhost:${process.env.PORT}`;

const noteMockCreate = () => {
  return new Note({
    title: faker.lorem.words(10),
    content: faker.lorem.words(100),
  }).save()
}

describe('/api/notes', () => {
  beforeAll(server.start)
  afterAll(server.stop)
  afterEach(() => Note.remove({}))

  describe('POST /api/notes', () => {
    test('should respond with a note and 200 status', () => {
      let tempNote = {
        title: faker.lorem.words(10),
        content: faker.lorem.words(100),
      }
      return superagent.post(`${apiURL}/api/notes`)
      .send(tempNote)
      .then(res => {
        expect(res.status).toEqual(200)
        console.log('res.body', res.body)
        expect(res.body._id).toBeTruthy()
        expect(res.body.timestamp).toBeTruthy()
        expect(res.body.title).toEqual(tempNote.title)
        expect(res.body.content).toEqual(tempNote.content)
      })
    })

    test('should respond with a 400 status', () => {
      let mockNote = {
        content: faker.lorem.words(100),
      }
      return superagent.post(`${apiURL}/api/notes`)
      .send(mockNote)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400)
      })
    })
  })

  describe('GET /api/notes', () => {
    test('should respond with a note and 200 status', () => {
      let tempNote 
      return noteMockCreate()
      .then(note => {
        tempNote = note
        return superagent.get(`${apiURL}/api/notes/${note._id}`)
      })
      .then(res => {
        expect(res.status).toEqual(200)
        expect(res.body._id).toEqual(tempNote._id.toString())
        expect(res.body.timestamp).toBeTruthy()
        expect(res.body.title).toEqual(tempNote.title)
        expect(res.body.content).toEqual(tempNote.content)
      })
    })

    test('should respond with 404 status', () => {
      return superagent.get(`${apiURL}/api/notes/helloworld`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404)
      })
    })
  })
})
