'use strict';

const {Router} = require('express');
const Charity = require('../model/charity.js');
const httpErrors = require('http-errors');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const charityRouter = module.exports = new Router();

let fuzzy = (filterTerm) => new RegExp('.*' + filterTerm.toLowerCase().split('').join('.*') + '.*');

charityRouter.get('/charities', bearerAuth, (req, res, next) => {
  let {page='0'} = req.query;
  delete req.query.page;
  page = Number(page);
  if(isNaN(page))
    page=0;
  page = page < 0 ? 0 : page;

  // Fuzzy Search
  if (req.query.name) req.query.name = ({$regex: fuzzy(req.query.name), $options: 'i'});
  if (req.query.state) req.query.state = ({$regex: fuzzy(req.query.state), $options: 'i'});
  if (req.query.city) req.query.city = ({$regex: fuzzy(req.query.city), $options: 'i'});
  if (req.query.cause) req.query.cause = ({$regex: fuzzy(req.query.cause), $options: 'i'});
  if (req.query.category) req.query.category = ({$regex: fuzzy(req.query.category), $options: 'i'});
  // if (req.query.keywords) req.query.keywords = ({$regex: fuzzy(req.query.keywords), $options: 'i'});


  let charitiesCache;
  Charity.find(req.query)
    .skip(page * 100)
    .limit(100)
    .then(charities => {
      charitiesCache = charities;
      return Charity.find(req.query).count();
    })
    .then(count => {
      let result = {
        count,
        data: charitiesCache,
      };

      let lastPage = Math.floor(count / 100);
      res.links({
        next: `http://localhost/charities?page=${page+1}`,
        prev: `http://localhost/charities?page=${page < 1 ? 0 : page - 1}`,
        last: `http://localhost/charities?page=${lastPage}`,
      });
      res.json(result);
    })
    .catch(next);
});

charityRouter.get('/charities/:id', bearerAuth, (req, res, next) => {
  Charity.findById(req.params.id)
    .then(charity => {
      if(!charity)
        throw httpErrors(404, 'charity not found');
      res.json(charity);
    })
    .catch(next);
});
