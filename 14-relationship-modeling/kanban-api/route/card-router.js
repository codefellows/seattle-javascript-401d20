'use strict'

const {Router} = require('express')
const httpErrors = require('http-errors')
const jsonParser = require('body-parser').json()
const Card = require('../model/card.js')

const cardRouter = module.exports = new Router()

cardRouter.get('/cards/:id', (req, res, next) => {
  Card.findById(req.params.id)
  .populate('category')
  .then(card => {
    if(!card)
      return httpErrors(404, 'card not found')
    res.json(card)
  })
  .catch(next)
})

cardRouter.post('/cards', jsonParser, (req, res, next) => {
  new Card(req.body).save()
  .then(card => res.json(card))
  .catch(next)
})
