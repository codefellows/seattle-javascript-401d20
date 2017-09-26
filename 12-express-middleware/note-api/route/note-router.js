'use strict'

// npm dependecies
const {Router} = require('express')
const httpErrors = require('http-errors')
const jsonParser = require('body-parser').json()

// app dependencies
const Note = require('../model/note.js')
// modual interface
const noteRouter = module.exports = new Router()

noteRouter.post('/api/notes', jsonParser, (req, res, next) => {
  // create a note using the parsed body
  // and respond to the client
  if(!req.body.title || !req.body.content)
    next(httpErrors(400, 'title and content are required'))
  
  new Note(req.body).save()
  .then(note => res.json(note))
  .catch(next)
})

// router paramiters
noteRouter.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
  .then(note => {
    if(!note) throw httpErrors(404, 'note not found')
    res.json(note)
  })
  .catch(next)
})


noteRouter.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
  .then(note => {
    if(!note) throw httpErrors(404, 'note not found')
    res.sendStatus(204)
  })
  .catch(next)

})

noteRouter.put('/api/notes/:id', jsonParser, (req, res, next) => {
  let options = {runValidators: true, new: true}
  Note.findByIdAndUpdate(req.params.id, req.body, options)
  .then(note => {
    if(!note) throw httpErrors(404, 'note not found')
    res.json(note)
  })
  .catch(next)
})


noteRouter.get('/api/notes', (req, res, next) => {
  let {page='0'} = req.query 
  page = Number(page)
  if(isNaN(page)) page = 0
  page = page < 0 ? 0 : page

  let notesCache 
  Note.find({})
  .skip(page * 100)
  .limit(100)
  .then(notes => {
    notesCache = notes
    return Note.find({}).count()
  })
  .then(count => {
    let result = {
      count,
      data: notesCache 
    }

    let lastPage = Math.floor(count / 100)
    res.links({
      next: `http://localhost/api/notes?page=${page+1}`,
      prev: `http://localhost/api/notes?page=${page < 1 ? 0 : page - 1}`,
      last: `http://localhost/api/notes?page=${lastPage}`,
    })
    res.json(result)
  })
})


















