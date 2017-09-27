'use strict'

const {Router} = require('express')
const httpErrors = require('http-errors')
const jsonParser = require('body-parser').json()
const Category = require('../model/category.js')

const categoryRouter = module.exports = new Router()

categoryRouter.post('/categories', jsonParser, (req, res, next) => {
  if(!req.body.title)
    return next(httpErrors(400, 'Category model requires a title'))

  new Category(req.body).save()
  .then(category => res.json(category))
  .catch(next)
})

categoryRouter.put('/categories/:id', jsonParser, (req, res, next) => {
  let options = {new: true, runValidators: true}
  Category.findByIdAndUpdate(req.params.id, req.body, options)
  .then(category => {
    if(!category)
      throw httpErrors(404, 'category not found')
    res.json(category)
  })
  .catch(next)
})

categoryRouter.get('/categories/:id', (req, res, next) => {
  Category.findById(req.params.id)
  .then(category => {
    if(!category)
      throw httpErrors(404, 'category not found')
    res.json(category)
  })
  .catch(next)
})

categoryRouter.delete('/categories/:id', (req, res, next) => {
  Category.findByIdAndRemove(req.params.id)
  .then(category => {
    if(!category)
      throw httpErrors(404, 'category not found')
    res.sendStatus(204)
  })
  .catch(next)
})
