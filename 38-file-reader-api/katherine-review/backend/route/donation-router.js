'use strict';

const { Router } = require('express');
const httpErrors = require('http-errors');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Donation = require('../model/donation.js');
const Profile = require('../model/profile.js');

let fuzzy = (filterTerm) => new RegExp('.*' + filterTerm.toLowerCase().split('').join('.*') + '.*');

module.exports = new Router()
  .post('/donations', bearerAuth, (req, res, next) => {
    if(!req.body.amount || !req.body.charity)
      return next(httpErrors(400, 'amount and charity required'));

    Profile.findOne({account: req.account._id})
      .then(profile => {
        return new Donation({
          ...req.body,
          account: req.account._id,
          profile: profile._id,
        })
          .save()
          .then(profile => {
            res.json(profile);
          })
          .catch(next);
      });
  })
  .get('/donations', bearerAuth, (req, res, next) => {
    let { page = '0' } = req.query;
    delete req.query.page;
    page = Number(page);
    if (isNaN(page))
      page = 0;
    page = page < 0 ? 0 : page;

    // Fuzzy Search
    if (req.query.inHonorOf) req.query.inHonorOf = ({$regex: fuzzy(req.query.inHonorOf), $options: 'i'});

    let donationsCache;
    Donation.find(req.query)
      .populate('profile')
      .populate('charity')
      .skip(page * 100)
      .limit(100)
      .then(donations => {
        donationsCache = donations;
        return Donation.find(req.query).count();
      })
      .then(count => {
        let result = {
          count,
          data: donationsCache,
        };

        let lastPage = Math.floor(count / 100);
        res.links({
          next: `http://localhost/donations?page=${page + 1}`,
          prev: `http://localhost/donations?page=${page < 1 ? 0 : page - 1}`,
          last: `http://localhost/donations?page=${lastPage}`,
        });
        res.json(result);
      })
      .catch(next);
  });
