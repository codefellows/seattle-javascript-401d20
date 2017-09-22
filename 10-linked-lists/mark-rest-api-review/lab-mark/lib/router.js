'use strict';

const requestParser = require('./request-parser.js');

let routeHandlers = {
  POST: {},
  GET: {},
  PUT: {},
  DELETE: {},
  PATCH: {},
  OPTIONS: {},
  CONNECT: {},
  HEAD: {},
};

module.exports = {
  get: (url, callback) => {
    routeHandlers.GET[url] = callback;
  },
  post: (url, callback) => {
    routeHandlers.POST[url] = callback;
  },
  put: (url, callback) => {
    routeHandlers.PUT[url] = callback;
  },
  delete: (url, callback) => {
    routeHandlers.DELETE[url] = callback;
  },
  route: (req, res) => {
    requestParser(req)
      .then(req => {
        let handler = routeHandlers[req.method][req.url.pathname];
        if(handler)
          return handler(req, res);
        res.writeHead(404);
        res.end();
      })
      .catch(err => {
        console.error('__REQUEST_ERROR__', err);
        res.writeHead(400);
        res.end();
      });
  },
};
