'use strict';

const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

const app = express();
let isOn = false;
let http = null;

app.use(require('./logger-middleware.js'));

app.use(require('../route/sandwich-router.js'));

app.all('*', (req, res) => res.sendStatus(404) );

app.use(require('./error-middleware.js'));

module.exports = {
  start: () => {
    return new Promise((resolve, reject) => {
      if(isOn)
        return reject(new Error('::SERVER_ERROR:: server is allready on'));
      http = app.listen(process.env.PORT, () => {
        isOn = true;
        console.log('::SERVER_ON::', process.env.PORT);
        resolve();
      });
    });
  },
  stop: () => {
    return new Promise((resolve, reject) => {
      if(!isOn)
        return reject(new Error('::SERVER_ERROR:: server is allready off'));
      if(!http)
        return reject(new Error('::SERVER_ERROR:: there is no server to close'));
      http.close(() => {
        isOn = false;
        http = null;
        console.log('::SERVER_OFF::');
        resolve();
      });
    });
  },
}
