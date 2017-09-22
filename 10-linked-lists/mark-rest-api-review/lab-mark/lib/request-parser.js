'use strict';

const url = require('url');
const queryString = require('querystring');

module.exports = (req) => {
  return new Promise((resolve, reject) => {
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);

    if(!(req.method === 'POST' || req.method === 'PUT'))
      return resolve(req);

    let text = '';
    // accumulate the chunks of data sent from the client
    req.on('data', (buffer) => {
      text += buffer.toString();
    });

    // parse the accumulated data as JSON  and make a body property on the req
    req.on('end', () => {
      try {
        req.text = text;
        //console.log('req.headers', req.headers)
        if(req.headers['content-type'].indexOf('application/json') > -1)
          req.body = JSON.parse(text);
        resolve(req);
      } catch (err) {
        return reject(err);
      }
    });
    req.on('error', reject);
  });
};
