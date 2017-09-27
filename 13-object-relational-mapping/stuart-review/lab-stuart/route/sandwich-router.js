'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const httpErrors = require('http-errors');

const Sandwich = require('../model/sandwich.js');
const sandwichRouter = module.exports = new Router();

sandwichRouter.post('/api/sandwiches', jsonParser, (req, res, next) => {
  if(!req.body.bread || !req.body.cheese || !req.body.spread)
    return next(httpErrors(400, 'bread, cheese, and spread are required'));
  new Sandwich(req.body).save()
  .then(sandwich => res.json(sandwich))
  .catch(next);
});

sandwichRouter.get('/api/sandwiches', (req, res, next) => {
  let {page='0'} = req.query;
  page = Number(page);
  if(isNaN(page)) page = 0;
  page = page < 0 ? 0 : page;

  let sandwichesCache;
  Sandwich.find({})
  .skip(page * 100)
  .limit(100)
  .then(sandwiches => {
    sandwichesCache = sandwiches;
    return Sandwich.find({}).count();
  })
  .then(count => {
    let result = {
      count,
      data: sandwichesCache 
    }

    let lastPage = Math.floor(count / 100);
    res.links({
      next: `http://localhost/api/notes?page=${page+1}`,
      prev: `http://localhost/api/notes?page=${page < 1 ? 0 : page - 1}`,
      last: `http://localhost/api/notes?page=${lastPage}`,
    });
    res.json(result);
  });
});

sandwichRouter.get('/api/sandwiches/:id', (req, res, next) => {
  Sandwich.findById(req.params.id)
  .then(sandwich => {
    if(!sandwich) throw httpErrors(404, 'sandwich not found');
    res.json(sandwich);
  })
  .catch(next);
});

sandwichRouter.delete('/api/sandwiches/:id', (req, res, next) => {
  Sandwich.findByIdAndRemove(req.params.id)
  .then(sandwich => {
    if(!sandwich) throw httpErrors(404, 'sandwich not found');
    res.sendStatus(204);
  })
  .catch(next);
});

sandwichRouter.put('/api/sandwiches/:id', (req, res, next) => {
  let options = {runValidators: true, new: true}
  Sandwich.findByIdAndUpdate(req.params.id, req.body, options)
  .then(sandwich => {
    if(!sandwich) throw httpErrors(404, 'sandwich not found')
    res.json(sandwich);
  })
  .catch(next);
});
