'use strict'

const Note = require('../model/note.js')
const router = require('../lib/router.js')

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
  notes.push(note)
  sendJSON(res, 200, note)
})

router.get('/api/notes', (req, res) => {
})


















