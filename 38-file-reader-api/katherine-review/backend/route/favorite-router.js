'use strict';

const {Router} = require('express');
const httpErrors = require('http-errors');
const Favorite = require('../model/favorite.js');
const Profile = require('../model/profile.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');


const favoriteRouter = module.exports = new Router();

favoriteRouter.post('/favorites', bearerAuth, (req, res, next) => {
  let profile;

  if(!req.body.charity)
    return next(httpErrors(400, 'Charity required'));

  Profile.findOne({account: req.account._id})
    .then(tempProfile => {
      profile = tempProfile;
      return Favorite.findOne({account: req.account._id, profile: profile._id, charity: req.body.charity});
    })
    .then(favorite => {
      if(favorite)
        return next(httpErrors(409, 'Duplicate favorite'));

      return new Favorite({
        charity: req.body.charity,
        account: req.account._id,
        profile: profile._id,
      }).save();
    })
    .then(favorite => res.json(favorite))
    .catch(next);
});

favoriteRouter.get('/favorites', bearerAuth, (req, res, next) => {
  let {page='0'} = req.query;
  delete req.query.page;
  page = Number(page);
  if(isNaN(page))
    page=0;
  page = page < 0 ? 0 : page;

  let favoritesCache;
  Favorite.find(req.query)
    .populate('profile')
    .populate('charity')
    .skip(page * 100)
    .limit(100)
    .then(favorites => {
      favoritesCache = favorites;
      return Favorite.find(req.query).count();
    })
    .then(count => {
      let result = {
        count,
        data: favoritesCache,
      };

      let lastPage = Math.floor(count / 100);
      res.links({
        next: `http://localhost/favorites?page=${page+1}`,
        prev: `http://localhost/favorites?page=${page < 1 ? 0 : page - 1}`,
        last: `http://localhost/favorites?page=${lastPage}`,
      });
      res.json(result);
    })
    .catch(next);
});

favoriteRouter.delete('/favorites/:id', bearerAuth, (req, res, next) => {
  Favorite.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
