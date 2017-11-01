'use strict';

require('./lib/setup.js');
const superagent = require('superagent');
const server = require('../lib/server.js');
const charityMock = require('./lib/charity-mock.js');
const profileMock = require('./lib/profile-mock.js');
const favoriteMock = require('./lib/favorite-mock.js');

const apiURL = `http://localhost:${process.env.PORT}`;

describe('/favorites', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(profileMock.remove);
  afterEach(charityMock.remove);
  afterEach(favoriteMock.remove);

  describe('POST /favorites', () => {
    test('200 OK create a favorite', () => {
      let tempProfile;
      let tempCharity;

      return profileMock.create()
        .then(mock => {
          tempProfile = mock;
          return charityMock.create();
        })
        .then(mock => {
          tempCharity = mock;
          return superagent.post(`${apiURL}/favorites`)
            .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`)
            .send({
              charity: tempCharity._id,
            });
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.charity).toEqual(tempCharity._id.toString());
          expect(res.body.profile).toEqual(tempProfile.profile._id.toString());
          expect(res.body.account).toEqual(tempProfile.tempAccount.account._id.toString());
        });
    });

    test('409 Duplicate', () => {
      let tempProfile;
      let tempCharity;

      return profileMock.create()
        .then(mock => {
          tempProfile = mock;
          return charityMock.create();
        })
        .then(mock => {
          tempCharity = mock;
          return superagent.post(`${apiURL}/favorites`)
            .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`)
            .send({
              charity: tempCharity._id,
            });
        })
        .then(() => {
          return superagent.post(`${apiURL}/favorites`)
            .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`)
            .send({
              charity: tempCharity._id,
            });
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });

    test('400 Charity required', () => {
      let tempProfile;
      return profileMock.create()
        .then(mock => {
          tempProfile = mock;
          return superagent.post(`${apiURL}/favorites`)
            .set('Authorization', `Bearer ${tempProfile.tempAccount.token}`);
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('GET /favorites', () => {
    test('200 OK get all favorites', () => {
      let tempProfiles;
      let tempCharities;
      let token;

      return profileMock.createMany(10)
        .then(mock => {
          tempProfiles = mock.map(result => result.profile);
          token = mock[0].tempAccount.token;
          return charityMock.createMany(20);
        })
        .then(charities => {
          tempCharities = charities;
          return favoriteMock.createMany(50, tempProfiles, tempCharities);
        })
        .then(() => {
          return superagent.get(`${apiURL}/favorites`)
            .set('Authorization', `Bearer ${token}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.count).toEqual(50);
        });
    });

    test('200 OK get all favorites that match query', () => {
      let tempProfiles;
      let tempCharities;
      let token;

      return profileMock.createMany(10)
        .then(mock => {
          tempProfiles = mock.map(result => result.profile);
          token = mock[0].tempAccount.token;
          return charityMock.createMany(20);
        })
        .then(charities => {
          tempCharities = charities;
          return favoriteMock.createMany(50, tempProfiles, tempCharities);
        })
        .then(() => {
          return superagent.get(`${apiURL}/favorites?profile=${tempProfiles[0]._id}`)
            .set('Authorization', `Bearer ${token}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

    test('200 page should return NaN', () => {
      let token;
      return profileMock.create()
        .then(mock => {
          token = mock.tempAccount.token;
          return superagent.get(`${apiURL}/favorites?page=dsgsdhdhdf`)
            .set('Authorization', `Bearer ${token}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

    test('200 page should less than zero', () => {
      let token;
      return profileMock.create()
        .then(mock => {
          token = mock.tempAccount.token;
          return superagent.get(`${apiURL}/favorites?page=-1`)
            .set('Authorization', `Bearer ${token}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

    test('200 page should be more than zero', () => {
      let token;
      return profileMock.create()
        .then(mock => {
          token = mock.tempAccount.token;
          return superagent.get(`${apiURL}/favorites?page=1`)
            .set('Authorization', `Bearer ${token}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
  });


  describe('DELETE /favorites', () => {
    test('204 favorite deleted', () => {
      let tempProfiles;
      let tempCharities;
      let token;

      return profileMock.createMany(4)
        .then(mock => {
          tempProfiles = mock.map(result => result.profile);
          token = mock[0].tempAccount.token;
          return charityMock.createMany(10);
        })
        .then(charities => {
          tempCharities = charities;
          return favoriteMock.createMany(5, tempProfiles, tempCharities);
        })
        .then(favorites => {
          return superagent.delete(`${apiURL}/favorites/${favorites[0]._id}`)
            .set('Authorization', `Bearer ${token}`);
        })
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });
  });
});
