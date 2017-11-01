'use strict';

const { Router } = require('express');
const httpErrors = require('http-errors');
const multer = require('multer');
const s3 = require('../lib/s3.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Profile = require('../model/profile.js');

const upload = multer({ dest: `${__dirname}/../temp` });

let fuzzy = (filterTerm) => new RegExp('.*' + filterTerm.toLowerCase().split('').join('.*') + '.*');

module.exports = new Router()
  .post('/profiles', bearerAuth, (req, res, next) => {
    return new Profile({
      ...req.body,
      photo: undefined,
      account: req.account._id,
      username: req.account.username,
      email: req.account.email,
    }).save()
      .then(profile => {
        res.json(profile);
      })
      .catch(next);
  })
  .get('/profiles/:id', bearerAuth, (req, res, next) => {
    Profile.findById(req.params.id)
      .then(profile => {
        if (!profile)
          throw httpErrors(404, '__REQUEST_ERROR__ profile not found');
        res.json(profile);
      })
      .catch(next);
  })
  .get('/profiles', bearerAuth, (req, res, next) => {
    let { page = '0' } = req.query;
    delete req.query.page;
    page = Number(page);
    if (isNaN(page))
      page = 0;
    page = page < 0 ? 0 : page;

    // Fuzzy Search
    if (req.query.firstName) req.query.firstName = ({$regex: fuzzy(req.query.firstName), $options: 'i'});
    if (req.query.lastName) req.query.lastName = ({$regex: fuzzy(req.query.lastName), $options: 'i'});
    if (req.query.city) req.query.city = ({$regex: fuzzy(req.query.city), $options: 'i'});
    if (req.query.state) req.query.state = ({$regex: fuzzy(req.query.state), $options: 'i'});

    let profilesCache;
    Profile.find(req.query)
      .skip(page * 100)
      .limit(100)
      .then(profiles => {
        profilesCache = profiles;
        return Profile.find(req.query).count();
      })
      .then(count => {
        let result = {
          count,
          data: profilesCache,
        };

        let lastPage = Math.floor(count / 100);
        res.links({
          next: `http://localhost/profiles?page=${page + 1}`,
          prev: `http://localhost/profiles?page=${page < 1 ? 0 : page - 1}`,
          last: `http://localhost/profiles?page=${lastPage}`,
        });
        res.json(result);
      })
      .catch(next);
  })

  .put('/profiles/avatar', bearerAuth, upload.any(), (req, res, next) => {
    let file = req.files[0];
    let key = `${file.filename}.${file.originalname}`;
    return s3.upload(file.path, key)
      .then(url => {
        return Profile.findOneAndUpdate({ account: req.account._id }, { photo: url }, { new: true, runValidators: true });
      })
      .then(profile => {
        if (!profile)
          throw httpErrors(404, '__REQUEST_ERROR__ profile not found');
        res.json(profile);
      })
      .catch(next);
  })

  .put('/profiles/:id', bearerAuth, (req, res, next) => {
    if (!req.body.firstName || !req.body.lastName)
      return next(httpErrors(400, 'first name and last name required'));
    Profile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .then(profile => {
        if (!profile)
          throw httpErrors(404, '__REQUEST_ERROR__ profile not found');
        res.json(profile);
      })
      .catch(next);
  });
