'use strict';

process.env.PORT = 3000;

const server = require('../lib/server.js');

describe('Server start/stops', () => {
  beforeAll(server.start);

  test('should not be able to start if already on', () => {
    return server.start()
      .then(Promise.reject)
      .catch(err => {
        expect(err.message).toEqual('__SERVER_ERROR__ server is already running');
      });
  });

  test('should not be able to stop if already off', () => {
    return server.stop()
      .then(server.stop)
      .then(Promise.reject)
      .catch(err => {
        expect(err.message).toEqual('__SERVER_ERROR__ server is already off');
      });
  });
});
