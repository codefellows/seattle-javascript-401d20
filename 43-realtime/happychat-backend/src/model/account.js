'use strict'

// DEPENDECIES
import * as bcrypt from 'bcrypt'
import {randomBytes} from 'crypto'
import * as jwt from 'jsonwebtoken'
import createError from 'http-errors'
import {promisify} from '../lib/promisify.js' 
import Mongoose, {Schema} from 'mongoose'

// SCHEMA
const accountSchema =  new Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: true},
  googleOAuth: {type: Boolean, default: false},
  tokenSeed: {type: String,  unique: true, default: ''},
})

// INSTANCE METHODS
accountSchema.methods.passwordCompare = function(password){
  return bcrypt.compare(password, this.passwordHash)
  .then(success => {
    if (!success)
      throw createError(401, 'AUTH ERROR: wrong password')
    return this
  })
}

accountSchema.methods.tokenCreate  = function(){
  this.tokenSeed = randomBytes(32).toString('base64')
  return this.save()
  .then(user => {
    return jwt.sign({tokenSeed: this.tokenSeed}, process.env.SECRET)
  })
  .then(token => {
    return token
  })
}

// MODEL
const Account = Mongoose.model('account', accountSchema)

// STATIC METHODS
Account.createFromSignup = function (user) {
  if(!user.password || !user.email || !user.username)
    return Promise.reject(
      createError(400, 'VALIDATION ERROR: missing username email or password '))

  let {password} = user
  user = Object.assign({}, user, {password: undefined})

  return bcrypt.hash(password, 1)
  .then(passwordHash => {
    let data = Object.assign({}, user, {passwordHash}) 
    return new Account(data).save()
  })
}

// 
Account.handleGoogleOAuth = function(openIDProfile){
  //find or create an account
  return Account.findOne({email: openIDProfile.email})
  .then(account => {
    if (account) {
      // check that the account has googleOAuth true
      if(account.googleOAuth)
        return account
      throw new Error('account found but not connected to google')
    }
    // create an account based on the email
    return new Account({
      username: openIDProfile.email.split('@')[0],
      email: openIDProfile.email,
      passwordHash: randomBytes(32).toString('hex'), // invalid password that no1 knows
      tokenSeed: randomBytes(32).toString('hex'), 
      googleOAuth: true,
    })
    .save()
  })
}

// INTERFACE
export default Account
