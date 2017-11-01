'use strict';

require('./lib/setup.js');
const superagent = require('superagent');
const server = require('../lib/server.js');
const charityMock = require('./lib/charity-mock.js');
const accountMock = require('./lib/account-mock.js');
const faker = require('faker');

const apiURL = `http://localhost:${process.env.PORT}`;

describe('/charities', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(charityMock.remove);

  describe('GET /charities', () => {
    test('should return 1000 charities', () => {
      let tempAccount;
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(mock => {
          tempAccount = mock;
          return charityMock.createMany(1000)
            .then(() => {
              return superagent.get(`${apiURL}/charities`)
                .set('Authorization', `Bearer ${tempAccount.token}`);
            })
            .then(res => {
              expect(res.status).toEqual(200);
              expect(res.body.count).toEqual(1000);
              expect(res.body.data.length).toEqual(100);
              expect(res.links).toBeTruthy();
            });
        });
    });

    test('should return charities that match query', () => {
      let tempAccount;
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(mock => {
          tempAccount = mock;
          return charityMock.createMany(1000)
            .then(() => {
              return superagent.get(`${apiURL}/charities?state=California`)
                .set('Authorization', `Bearer ${tempAccount.token}`);
            })
            .then(res => {
              expect(res.status).toEqual(200);
            });
        });
    });

    test('should return charities that match regex query', () => {
      let tempAccount;
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(mock => {
          tempAccount = mock;
          return charityMock.createMany(1000)
            .then(() => {
              return superagent.get(`${apiURL}/charities?state=missis`)
                .set('Authorization', `Bearer ${tempAccount.token}`);
            })
            .then(res => {
              expect(res.status).toEqual(200);
            });
        });
    });

    test('should return charities with link to first page', () => {
      let tempAccount;
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(mock => {
          tempAccount = mock;
          return charityMock.createMany(1000)
            .then(() => {
              return superagent.get(`${apiURL}/charities?page=abalala`)
                .set('Authorization', `Bearer ${tempAccount.token}`);
            })
            .then(res => {
              expect(res.status).toEqual(200);
              expect(res.links.next).toEqual(`${apiURL.split(':').slice(0,2).join(':')}/charities?page=1`);
            });
        });
    });

    test('200 should return a charity', () => {
      let tempAccount;
      let newCharity;
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(mock => {
          tempAccount = mock;
          return charityMock.create()
            .then(tempCharity => {
              newCharity = tempCharity;
              return superagent.get(`${apiURL}/charities/${tempCharity._id}`)
                .set('Authorization', `Bearer ${tempAccount.token}`);
            })
            .then(res => {
              expect(res.status).toEqual(200);
              expect(res.body._id).toEqual(newCharity._id.toString());
              expect(res.body.name).toEqual(newCharity.name);
              expect(res.body.streetAdd).toEqual(newCharity.streetAdd);
              expect(res.body.city).toEqual(newCharity.city);
              expect(res.body.state).toEqual(newCharity.state);
              expect(res.body.zip).toEqual(newCharity.zip);
              expect(res.body.mission).toEqual(newCharity.mission);
              expect(res.body.cause).toEqual(newCharity.cause);
              expect(res.body.rating).toEqual(newCharity.rating);
              expect(res.body.websiteURL).toEqual(newCharity.websiteURL);
              expect(res.body.photoURL).toEqual(newCharity.photoURL);
              expect(res.body.category).toEqual(newCharity.category);
              expect(res.body.phoneNumber).toEqual(newCharity.phoneNumber);
              expect(res.body.email).toEqual(newCharity.email);
              expect(res.body.created).toEqual(newCharity.created.toJSON());
              expect(JSON.stringify(res.body.keywords)).toEqual(JSON.stringify(newCharity.keywords));
            });
        });
    });

    test('404', () => {
      let tempAccount;
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(mock => {
          tempAccount = mock;
          return charityMock.create()
            .then(() => {
              return superagent.get(`${apiURL}/charities/hiiiiiiiiiii`)
                .set('Authorization', `Bearer ${tempAccount.token}`);
            })
            .then(Promise.reject)
            .catch(res => {
              expect(res.status).toEqual(404);
            });
        });
    });

    test('401', () => {
      let tempAccount;
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(mock => {
          tempAccount = mock;
          return charityMock.create()
            .then(tempCharity => {
              return superagent.get(`${apiURL}/charities/${tempCharity._id}`)
                .set('Authorization', `Bearer ${tempAccount}`);
            })
            .then(Promise.reject)
            .catch(res => {
              expect(res.status).toEqual(401);
            });
        });
    });
  });
});
