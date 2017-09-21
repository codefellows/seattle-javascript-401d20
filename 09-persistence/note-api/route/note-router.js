'use strict'

const Note = require('../model/note.js')
const router = require('../lib/router.js')
const storage = require('../lib/storage.js')

// store data while the server is running
let notes = []

let sendStatus = (res, status, message) => {
  console.error('__REQUESTS_ERROR__', message)
  res.writeHead(status)
  res.end()
}

let sendJSON = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
  })
  res.end(JSON.stringify(data))
}

router.post('/api/notes', (req, res) => {
  if(!req.body)
    return sendStatus(res, 400, 'no body found')
  if(!req.body.title)
    return sendStatus(res, 400, 'no title found')
  if(!req.body.content)
    return sendStatus(res, 400, 'no content found')

  let note = new Note(req.body)

  // persist the note
  storage.setItem(note)
  .then(note => {
    return sendJSON(res, 200, note)
  })
  .catch(err => {
    console.error(err)
    return sendStatus(res, 500)
  })
})

router.get('/api/notes', (req, res) => {
  if(req.url.query.id){
    // send one note
    storage.fetchItem(req.url.query.id)
    .then(note => sendJSON(res, 200, note))
    .catch(err => {
      console.error(err)
      if(err.message.indexOf('not found') > -1)
        return sendStatus(res, 404)
      sendStatus(500)
    })
  } else {
    // send all the notes
    storage.fetch()
    .then(notes => sendJSON(res, 200, notes))
    .catch(err => {
      console.error(err)
      sendStatus(res, 500)
    })
  }
})


















