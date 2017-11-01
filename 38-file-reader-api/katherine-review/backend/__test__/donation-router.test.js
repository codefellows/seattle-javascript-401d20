'use strict';

require('./lib/setup.js');

const superagent = require('superagent');
const server = require('../lib/server.js');
const profileMock = require('./lib/profile-mock.js');
const charityMock = require('./lib/charity-mock.js');
const donationMock = require('./lib/donation-mock.js');

const apiURL = `http://localhost:${process.env.PORT}`;

describe('/donations', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(profileMock.remove);
  afterEach(charityMock.remove);
  afterEach(donationMock.remove);

  describe('POST /donations', () => {
    test('200 should return a donation', () => {
      let tempProfile;
      let tempCharity;
      return profileMock.create()
        .then(mock => {
          tempProfile = mock;
          return charityMock.create();
        })
        .then(mock => {
          tempCharity = mock;
          return superagent.post(`${apiURL}/donations`)
            .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`)
            .send({
              amount: 50,
              inHonorOf: 'Helen Hanson',
              charity: tempCharity._id,
            });
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.amount).toEqual(50);
          expect(response.body.inHonorOf).toEqual('Helen Hanson');
          expect(response.body.charity).toEqual(tempCharity._id.toString());
          expect(response.body.profile).toEqual(tempProfile.profile._id.toString());
        });
    });

    test('400 due to missing amount', () => {
      let tempProfile;
      let tempCharity;
      return profileMock.create()
        .then(mock => {
          tempProfile = mock;
          return charityMock.create();
        })
        .then(mock => {
          tempCharity = mock;
          return superagent.post(`${apiURL}/donations`)
            .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`)
            .send({
              inHonorOf: 'Helen Hanson',
              charity: tempCharity._id,
            });
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('400 due to missing charity', () => {
      let tempProfile;
      return profileMock.create()
        .then(mock => {
          tempProfile = mock;
          return charityMock.create();
        })
        .then(() => {
          return superagent.post(`${apiURL}/donations`)
            .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`)
            .send({
              amount: 50,
              inHonorOf: 'Helen Hanson',
            });
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('401 due to bad token', () => {
      let tempCharity;
      return profileMock.create()
        .then(() => {
          return charityMock.create();
        })
        .then(mock => {
          tempCharity = mock;
          return superagent.post(`${apiURL}/donations`)
            .set('Authorization', `Bearer badToken`)
            .send({
              amount: 50,
              inHonorOf: 'Helen Hanson',
              charity: tempCharity._id,
            });
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(401);
        });
    });
  });

  describe('GET /donations', () => {
    test('GET /donations should return 5 donations', () => {
      let tempProfile;
      let tempCharity;
      return profileMock.create()
        .then(mock => {
          tempProfile = mock;
          return charityMock.create()
            .then(mock => {
              tempCharity = mock;
              return donationMock.createMany(5, tempProfile.profile, tempCharity)
                .then(() => {
                  return superagent.get(`${apiURL}/donations`)
                    .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`);
                })
                .then(res => {
                  expect(res.status).toEqual(200);
                  expect(res.body.count).toEqual(5);
                });
            });
        });
    });

    test('GET /donations? 200 should return 5 donations', () => {
      let tempProfile;
      let tempCharity;
      return profileMock.create()
        .then(mock => {
          tempProfile = mock;
          return charityMock.create()
            .then(mock => {
              tempCharity = mock;
              return donationMock.createMany(5, tempProfile.profile, tempCharity)
                .then(() => {
                  return superagent.get(`${apiURL}/donations?inHonorOf=Helen Hanson`)
                    .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`);
                })
                .then(res => {
                  expect(res.status).toEqual(200);
                });
            });
        });
    });

    test('GET /donations? 200 should return 5 donations (fuzzy)', () => {
      let tempProfile;
      let tempCharity;
      return profileMock.create()
        .then(mock => {
          tempProfile = mock;
          return charityMock.create()
            .then(mock => {
              tempCharity = mock;
              return donationMock.createMany(5, tempProfile.profile, tempCharity)
                .then(() => {
                  return superagent.get(`${apiURL}/donations?inHonorOf=hele`)
                    .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`);
                })
                .then(res => {
                  expect(res.status).toEqual(200);
                });
            });
        });
    });

    test('GET /donations? pagination test NaN page should return 200', () => {
      return profileMock.create()
        .then(mock => {
          return superagent.get(`${apiURL}/donations?page=nyahahha`)
            .set('Authorization', `Bearer ${mock.tempAccount.token}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

    test('GET /donations? pagination test NaN page should return 200', () => {
      return profileMock.create()
        .then(mock => {
          return superagent.get(`${apiURL}/donations?page=1`)
            .set('Authorization', `Bearer ${mock.tempAccount.token}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

    test('GET /donations? pagination test NaN page should return 200', () => {
      return profileMock.create()
        .then(mock => {
          return superagent.get(`${apiURL}/donations?page=-1`)
            .set('Authorization', `Bearer ${mock.tempAccount.token}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
  });
});
