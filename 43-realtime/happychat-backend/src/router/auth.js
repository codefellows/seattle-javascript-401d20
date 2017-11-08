'use strict'

import {Router} from 'express'
import bodyParser from 'body-parser'
import Account from '../model/account.js'
import superagent from 'superagent'
import basicAuth from '../middleware/basic-auth.js'
import bearerAuth from '../middleware/bearer-auth.js'

export default new Router()
.get('/oauth/google', (req, res, next) => {
  // check for a code
  console.log(req.query)
  // get gode if no code go back to fontend
  if(!req.query.code){
    res.redirect(process.env.CLIENT_URL)
  } else {
    //exchange code and client secret and clientID for a accessToken
    superagent.post('https://www.googleapis.com/oauth2/v4/token')
    .type('form')
    .send({
      code: req.query.code,
      grant_type: 'authorization_code',
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.API_URL}/oauth/google`,
    })
    .then((res) => {
      console.log(res.body)
      if(!res.body.access_token)
        throw new Error('no access token')
      return res.body.access_token
    })
    .then(accessToken => {
      // exchange the access token for a profile
      return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
      .set('Authorization', `Bearer ${accessToken}`)
    })
    .then(res => {
      // find an account or create an account
      return Account.handleGoogleOAuth(res.body)
    })
    .then(account => account.tokenCreate())
    .then(token => {
      res.cookie('X-Happichat-token', token)
      res.redirect(process.env.CLIENT_URL)
    })
    .catch(err => {
      console.error(err)
      res.cookie('X-Happichat-token', '')
      res.redirect(process.env.CLIENT_URL + '?error=oauth')
    })

  }


  // go back to the client

})
.post('/signup', bodyParser.json() , (req, res, next) => {
  new Account.createFromSignup(req.body)
  .then(user => user.tokenCreate())
  .then(token => {
    res.cookie('X-Slugchat-Token', token)
    res.send(token)
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
.get('/profiles/me', bearerAuth, (req, res, next) => {
  console.log('req.user', req.user)
  res.json({
    username: req.user.username, email: req.user.email,
  })
})
