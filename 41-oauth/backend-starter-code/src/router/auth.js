'use strict'

import {Router} from 'express'
import Account from '../model/account.js'
import bodyParser from 'body-parser'
import basicAuth from '../middleware/basic-auth.js'

export default new Router()
.post('/signup', bodyParser.json() , (req, res, next) => {
  new Account.createFromSignup(req.body)
  .then(user => user.tokenCreate())
  .then(token => {
    res.cookie('X-Slugchat-Token', token)
    res.send(token)
  })
  .catch(next)
})
.get('/usernames/:username', (req, res, next) => {
  Account.findOne({username: username})
  .then(user => {
    if(!user)
      return res.sendStatus(409)
    return res.sendStatus(200)
  })
  .catch(next)
})
.get('/login', basicAuth, (req, res, next) => {
  req.user.tokenCreate()
  .then((token) => {
    res.cookie('X-Slugchat-Token', token)
    res.send(token)
  })
  .catch(next)
})
