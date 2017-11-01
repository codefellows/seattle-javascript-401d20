'use strict';

const httpErrors = require('http-errors');
const Account = require('../model/account.js');

module.exports = (req, res, next) => {
  if(!req.headers.authorization)
    return next(httpErrors(400, '__REQUEST_ERROR__ authorization header required'));

  const encoded = req.headers.authorization.split('Basic ')[1];
  if(!encoded)
    return next(httpErrors(400, '__REQUEST_ERROR__ Basic auth required'));
  let decoded = new Buffer(encoded, 'base64').toString();
  let [username, password] = decoded.split(':');

  Account.findOne({username})
    .then(account => {
      if(!account)
        throw httpErrors(404, '__REQUEST_ERROR__ account does not exist');
      return account.passwordVerify(password);
    })
    .then(account => {
      req.account = account;
      next();
    })
    .catch(next);
};
