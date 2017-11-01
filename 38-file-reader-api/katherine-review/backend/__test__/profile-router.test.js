'use strict';

require('./lib/setup.js');

const faker = require('faker');
const superagent = require('superagent');
const server = require('../lib/server.js');
const accountMock = require('./lib/account-mock.js');
const profileMock = require('./lib/profile-mock.js');

const apiURL = `http://localhost:${process.env.PORT}`;

describe('/profiles', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(profileMock.remove);

  describe('POST /profiles', () => {
    test('200 should return a profile', () => {
      let tempAccount;
      return accountMock.create('12345')
        .then(mock => {
          tempAccount = mock;
          return superagent.post(`${apiURL}/profiles`)
            .set('Authorization', `Bearer ${tempAccount.token}`)
            .send({
              firstName: 'John',
              lastName: 'Jacobs',
              city: 'Seattle',
              state: 'WA',
              donationGoal: 5000,
              moneySpent: 2500,
              bio: 'Lorem ipsum.',
            });
        })
        .then(response => {
          expect(response.body.firstName).toEqual('John');
          expect(response.body.lastName).toEqual('Jacobs');
          expect(response.body.city).toEqual('Seattle');
          expect(response.body.state).toEqual('WA');
          expect(response.body.donationGoal).toEqual(5000);
          expect(response.body.moneySpent).toEqual(2500);
          expect(response.body.bio).toEqual('Lorem ipsum.');
          expect(response.body.account).toEqual(tempAccount.account._id.toString());
          expect(response.status).toEqual(200);
        });
    });

    test('400 should return bad request', () => {
      let tempAccount;
      return accountMock.create('12345')
        .then(mock => {
          tempAccount = mock;
          return superagent.post(`${apiURL}/profiles`)
            .set('Authorization', `Bearer ${tempAccount.token}`)
            .send({
              firstName: 'John',
              city: 'Seattle',
              state: 'WA',
              donationGoal: '5000',
              moneySpent: '2500',
              bio: 'Lorem ipsum.',
            });
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('404 Profile not found', () => {
      let tempAccount;
      return accountMock.create('1233')
        .then(mock => {
          tempAccount = mock;
          return superagent.post(`${apiURL}/badProfile/avatar`)
            .set('Authorization', `Bearer ${tempAccount.token}`);
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });

    test('401 should return unauthorized', () => {
      return superagent.post(`${apiURL}/profiles`)
        .set('Authorization', `Bad Token`)
        .send({
          firstName: 'Jane',
          lastName: 'Doe',
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(401);
        });
    });
  });

  describe('GET /profiles', () => {
    test('GET /profiles/:id 200', () => {
      let tempMock;
      return profileMock.create()
        .then(mock => {
          tempMock = mock;
          return superagent.get(`${apiURL}/profiles/${mock.profile._id}`)
            .set('Authorization', `Bearer ${mock.tempAccount.token}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.firstName).toEqual(tempMock.profile.firstName);
          expect(res.body.lastName).toEqual(tempMock.profile.lastName);
          expect(res.body._id).toEqual(tempMock.profile._id.toString());
          expect(res.body.account).toEqual(tempMock.tempAccount.account._id.toString());
        });
    });

    test('GET /profiles/:id 404', () => {
      return profileMock.create()
        .then(mock => {
          return superagent.get(`${apiURL}/profiles/badId`)
            .set('Authorization', `Bearer ${mock.tempAccount.token}`);
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });

    test('GET /profiles/:id 401', () => {
      return profileMock.create()
        .then(mock => {
          return superagent.get(`${apiURL}/profiles/${mock.profile._id}`)
            .set('Authorization', `Bearer badToken`);
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(401);
        });
    });

    test('GET /profiles 200 should return 100 profiles', () => {
      let tempAccount;
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(mock => {
          tempAccount = mock;
          return profileMock.createMany(100)
            .then(() => {
              return superagent.get(`${apiURL}/profiles`)
                .set('Authorization', `Bearer ${tempAccount.token}`);
            })
            .then(res => {
              expect(res.status).toEqual(200);
              expect(res.body.count).toEqual(100);
              expect(res.body.data.length).toEqual(100);
            });
        });
    });

    test('GET /profiles? 200 should return 100 profiles', () => {
      let tempAccount;
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(mock => {
          tempAccount = mock;
          return profileMock.createMany(100)
            .then(() => {
              return superagent.get(`${apiURL}/profiles?state=Washington`)
                .set('Authorization', `Bearer ${tempAccount.token}`);
            })
            .then(res => {
              expect(res.status).toEqual(200);
            });
        });
    });

    test('GET /profiles? 200 should return 100 profiles (fuzzy)', () => {
      let tempAccount;
      let mockPassword = faker.internet.password();
      return accountMock.create(mockPassword)
        .then(mock => {
          tempAccount = mock;
          return profileMock.createMany(100)
            .then(() => {
              return superagent.get(`${apiURL}/profiles?state=wn`)
                .set('Authorization', `Bearer ${tempAccount.token}`);
            })
            .then(res => {
              expect(res.status).toEqual(200);
            });
        });
    });

    test('GET /profiles 200 page should be NaN', () => {
      let token;
      return profileMock.create()
        .then(mock => {
          token = mock.tempAccount.token;
          return superagent.get(`${apiURL}/profiles?page=wedrfgh`)
            .set('Authorization', `Bearer ${token}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

    test('GET /profiles 200 page should be less than zero', () => {
      let token ;
      return profileMock.create()
        .then(mock => {
          token = mock.tempAccount.token;
          return superagent.get(`${apiURL}/profiles?page=-1`)
            .set('Authorization', `Bearer ${token}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

    test('200 page should be less than zero', () => {
      let token;
      return profileMock.create()
        .then(mock => {
          token = mock.tempAccount.token;
          return superagent.get(`${apiURL}/profiles?page=1`)
            .set('Authorization', `Bearer ${token}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
  });

  describe('PUT /profiles/:id', () => {
    test('PUT /profiles/:id 200', () => {
      let tempProfile;
      return profileMock.create()
        .then(mock => {
          tempProfile = mock;
          return superagent.put(`${apiURL}/profiles/${tempProfile.profile._id}`)
            .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`)
            .send({
              firstName: 'Johnny',
              lastName: 'Bravo',
              city: 'Palo Alto',
              state: 'CA',
            });
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.firstName).toEqual('Johnny');
          expect(res.body.lastName).toEqual('Bravo');
          expect(res.body.city).toEqual('Palo Alto');
          expect(res.body.state).toEqual('CA');
        });
    });
  });

  test('PUT /profiles/:id 400', () => {
    let tempProfile;
    return profileMock.create()
      .then(mock => {
        tempProfile = mock;
        return superagent.put(`${apiURL}/profiles/${tempProfile.profile._id}`)
          .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`)
          .send({
            city: 'Palo Alto',
            state: 'CA',
          });
      })
      .then(Promise.reject)
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  test('PUT /profiles/:id 404', () => {
    return profileMock.create()
      .then(mock => {
        return superagent.put(`${apiURL}/profiles/badId`)
          .set('Authorization', `Bearer ${mock.tempAccount.token}`)
          .send({
            firstName: 'Johnny',
            lastName: 'Bravo',
          });
      })
      .then(Promise.reject)
      .catch(response => {
        expect(response.status).toEqual(404);
      });
  });

  describe('PUT /profiles/avatar', () => {
    test('updating an avatar photo', () => {
      let tempProfile;
      return profileMock.create()
        .then(mock => {
          tempProfile = mock;
          return superagent.put(`${apiURL}/profiles/avatar`)
            .field('hello', 'world')
            .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`)
            .attach('photo', `${__dirname}/asset/kitten.jpg`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.photo).toBeTruthy();
        });
    });
  });
});
