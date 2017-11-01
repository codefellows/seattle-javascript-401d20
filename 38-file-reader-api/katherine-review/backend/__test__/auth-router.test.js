'use strict';

// Load mock environment
require('./lib/setup.js');

const superagent = require('superagent');
const server = require('../lib/server.js');
const accountMock = require('./lib/account-mock.js');
const faker = require('faker');

const apiURL = `http://localhost:${process.env.PORT}`;

describe('AUTH router', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(accountMock.remove);

  describe('/auth', () => {
    test('POST /auth with 200', () => {
      return superagent.post(`${apiURL}/auth`)
        .send({
          username: 'MackAttack87',
          email: 'MackAttack@gmail.com',
          password: '1234password',
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.token).toBeTruthy();
        });
    });

    test('POST /auth with 400', () => {
      return superagent.post(`${apiURL}/auth`)
        .send({
          email: 'MackAttack@gmail.com',
          password: '1234wontwork',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('POST /auth with 409', () => {
      return superagent.post(`${apiURL}/auth`)
        .send({
          username: 'MackAttack87',
          email: 'MackAttack@gmail.com',
          password: '1234password',
        })
        .then(() => {
          // Same username signing up
          return superagent.post(`${apiURL}/auth`)
            .send({
              username: 'MackAttack87',
              email: 'DiffEmail@gmail.com',
              password: '1234anotherPassword',
            });
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });

    test('GET /auth with 200',() => {
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(mock => {
          return superagent.get(`${apiURL}/auth`)
            .auth(mock.request.username, mockPassword);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.token).toBeTruthy();
        });
    });

    test('GET /auth with 400 basic auth required',() => {
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(mock => {
          return superagent.get(`${apiURL}/auth`)
            .set('Authorization', `Bearer ${mock.token}`);
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('GET /auth with 401',() => {
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(mock => {
          return superagent.get(`${apiURL}/auth`)
            .auth(mock.request.username, 'lulwat');
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(401);
        });
    });

    test('GET /auth with 400',() => {
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(() => {
          return superagent.get(`${apiURL}/auth`);
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('GET /auth with 404',() => {
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(() => {
          return superagent.get(`${apiURL}/auth`)
            .auth('ThisUserDoesNotExist', mockPassword);
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });

    test('PUT /auth with 200',() => {
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(mock => {
          return superagent.put(`${apiURL}/auth`)
            .auth(mock.request.username, mockPassword)
            .send({
              username: 'NewName',
              email: 'NewEmail@gmail.com',
              password: 'newPword',
            });
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

    test('PUT /auth with 400', () => {
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(mock => {
          return superagent.put(`${apiURL}/auth`)
            .auth(mock.request.username, mockPassword)
            .send({
              username: 'NewName',
              email: 'NewEmail@gmail.com',
            });
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });
});
