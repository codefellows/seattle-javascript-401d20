'use strict'

const {Router} = require('express')
const jsonParser = require('body-parser').json()

const Note = require('../model/note.js')
const noteRouter = module.exports = new Router()

noteRouter.post('/api/notes', jsonParser, (req, res, next) => {
  // create a note using the parsed body
  // and respond to the client
  if(!req.body.title || !req.body.content)
    return res.sendStatus(400)
  
  new Note(req.body).save()
  .then(note => res.json(note))
  .catch(err => {
    console.error('__SERVER_ERROR__', err)
    res.sendStatus(500)
  })
})

// router paramiters
noteRouter.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
  .then(note => {
    if(!note)
      return res.sendStatus(404)
    res.json(note)
  })
  .catch(err => {
    console.error(err)
    if(err.message.indexOf('Cast to ObjectId failed') > -1)
      return res.sendStatus(404)
    res.sendStatus(500)
  })
})
