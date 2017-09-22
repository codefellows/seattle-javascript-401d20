'use strict'; // tells the V8 runtime to enforce stricter programming style

// mock the env vars for testing
process.env.PORT = 3000;
process.env.STORAGE_PATH = `${__dirname}/storage-test.json`;

// require dependencies
// node deps
// npm deps
const fs = require('fs-extra');
const superagent = require('superagent');
// app deps
const server = require('../lib/server.js');
const storage = require('../lib/storage.js');
const VideoGame = require('../model/videogame.js');

// test globals (constants)
const apiURL = `http://localhost:${process.env.PORT}`

let createMockVideoGame = () => storage.setItem(new VideoGame({
  title: 'Counter-Strike',
  genre: 'fps',
  console: 'pc',
}))

describe('/api/videogames', ()=> {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(() => fs.remove(process.env.STORAGE_PATH));

  let idToDelete; // a var for keeping track of ID  

  describe('POST /api/videogames', () => {
    test('should respond with a 200', () => {
      // superagent returns a Promise
      let data = {
          title: 'The Last of Us',
          genre: 'action',
          console: 'ps4',
      };

      return superagent.post(`${apiURL}/api/videogames`)
        .set('Content-Type', 'application/json')
        .send(data)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual(data.title);
          expect(res.body.genre).toEqual(data.genre);
          expect(res.body.console).toEqual(data.console);
          expect(res.body.timestamp).toBeTruthy();
          expect(res.body.id).toBeTruthy();
        });
    });

    test('should respond with a 404 for a bad path', () => {
      return superagent.post(`http://localhost:${process.env.PORT}/api/videogamezzz`)
        .set('Content-Type', 'application/json')
        .send({
          title: 'The Last of Us',
          genre: 'action',
          console: 'ps4',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });

    test('should respond with 400 no body found', () => {
      let data = {
          title: 'The Last of Us',
          genre: 'action',
          console: 'ps4',
      };
      return superagent.post(`http://localhost:${process.env.PORT}/api/videogames`)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('should respond with a 200', () => {
      return superagent.post(`http://localhost:${process.env.PORT}/api/videogames`)
        .set('Content-Type', 'application/json')
        .send({
          title: 'Gears of War',
          genre: 'action',
          console: 'xbox',
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual('Gears of War');
          expect(res.body.genre).toEqual('action');
          expect(res.body.console).toEqual('xbox');
          expect(res.body.timestamp).toBeTruthy();
          expect(res.body.id).toBeTruthy();
        });
    });

    test('should respond with a 404 for bad requests', () => {
      return superagent.post(`http://localhost:${process.env.PORT}/api/videogames`)
        .set('Content-Type', 'application/json')
        .send('{')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('should respond with a 400 no title', () => {
      return superagent.post(`http://localhost:${process.env.PORT}/api/videogames`)
        .set('Content-Type', 'application/json')
        .send({
          genre: 'action',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('should respond with a 400 no genre', () => {
      return superagent.post(`http://localhost:${process.env.PORT}/api/videogames`)
        .set('Content-Type', 'application/json')
        .send({
          title: 'The Last of Us',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    test('should respond with a 400 no title', () => {
      return superagent.post(`http://localhost:${process.env.PORT}/api/videogames`)
        .set('Content-Type', 'application/json')
        .send({
          console: 'ps4',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('should respond with a 400 no console', () => {
      return superagent.post(`http://localhost:${process.env.PORT}/api/videogames`)
        .set('Content-Type', 'application/json')
        .send({
          title: 'The Last of Us',
          genre: 'action',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('GET /api/videogames', () => {
    test('should respond with a 200, query with ID', () => {

        let mockVideoGame
        .then(videoGame => {
          mockVideoGame = videoGame
          return superagent.get(`http://localhost:${process.env.PORT}/api/videogames`)
            .query({ id: videoGame.id });
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual('Counter-Strike');
          expect(res.body.genre).toEqual('fps');
          expect(res.body.console).toEqual('pc');
          expect(res.body.timestamp).toBeTruthy();
          expect(res.body.id).toEqual(mockVideoGame.id);
        });
    });

    test('should respond with a 200, query with no ID', () => {
      return superagent.get(`http://localhost:${process.env.PORT}/api/videogames`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body[0].title).toEqual('The Last of Us');
          expect(res.body[0].genre).toEqual('action');
          expect(res.body[0].console).toEqual('ps4');
          expect(res.body[1].title).toEqual('Gears of War');
          expect(res.body[1].genre).toEqual('action');
          expect(res.body[1].console).toEqual('xbox');
          expect(res.body[2].title).toEqual('Counter-Strike');
          expect(res.body[2].genre).toEqual('fps');
          expect(res.body[2].console).toEqual('pc');
        });
    });

    test('should respond with a 404 if ID does not match any videogame', () => {
      return superagent.get(`http://localhost:${process.env.PORT}/api/videogames`)
        .query({ id: 12453 })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('DELETE /api/videogames', () => {
    test('should respond with a 204 if videogame is deleted successfully', () => {
      let mockVideoGame

        return createMockVideoGame()
        .then(videogame => {
          mockVideoGame = videogame
          return superagent.get(`http://localhost:${process.env.PORT}/api/videogames`)
            .query({ id: videogame.id });
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual('Some random game that\'s going to be deleted.');
          expect(res.body.genre).toEqual('idk');
          expect(res.body.console).toEqual('atari');
          expect(res.body.timestamp).toBeTruthy();
          expect(res.body.id).toBe(mockVideoGame.id);
        })
        .then(() => {
          return superagent.delete(`http://localhost:${process.env.PORT}/api/videogames`)
            .query({ id: idToDelete });
        })
        .then((res) => {
          expect(res.status).toEqual(204);
        })
        .then(() => {
          return superagent.get(`http://localhost:${process.env.PORT}/api/videogames`)
            .query({ id: idToDelete });
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });

    test('Should not be able to delete all', () => {
      return superagent.delete(`http://localhost:${process.env.PORT}/api/videogames`)
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('invalid ID', () => {
      return superagent.delete(`http://localhost:${process.env.PORT}/api/videogames`)
        .query({ id: 521255125152 })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('PUT /api/videogames', () => {
    test('should respond with a 200, update with ID', () => {
      return superagent.post(`http://localhost:${process.env.PORT}/api/videogames`)
        .set('Content-Type', 'application/json')
        .send({
          title: 'Portal',
          genre: 'adventure',
          console: 'pc',
        })
        .then(res => {
          return superagent.put(`http://localhost:${process.env.PORT}/api/videogames`)
            .set('Content-Type', 'application/json')
            .send({
              title: 'Portal',
              genre: 'puzzle',
              console: 'pc',
              id: res.body.id,
            });
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
    // test('should respond with a 200', () => {
    //   return superagent.post(`http://localhost:${process.env.PORT}/api/videogames`)
    //     .set('Content-Type', 'application/json')
    //     .send({
    //       title: 'Gears of War',
    //       genre: 'action',
    //       console: 'xbox',
    //     })
    //     .then(res => {
    //       expect(res.status).toEqual(200);
    //       expect(res.body.title).toEqual('Gears of War');
    //       expect(res.body.genre).toEqual('action');
    //       expect(res.body.console).toEqual('xbox');
    //       expect(res.body.timestamp).toBeTruthy();
    //       expect(res.body.id).toBeTruthy();
    //     });
    // });

    test('should respond with 400 no body found', () => {
      return superagent.put(`http://localhost:${process.env.PORT}/api/videogames`)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('should respond with a 404 for bad requests', () => {
      return superagent.put(`http://localhost:${process.env.PORT}/api/videogames`)
        .set('Content-Type', 'application/json')
        .send('{')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('should respond with a 400 no title', () => {
      return superagent.put(`http://localhost:${process.env.PORT}/api/videogames`)
        .set('Content-Type', 'application/json')
        .send({
          genre: 'action',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('should respond with a 400 no genre', () => {
      return superagent.put(`http://localhost:${process.env.PORT}/api/videogames`)
        .set('Content-Type', 'application/json')
        .send({
          title: 'The Last of Us',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('should respond with a 400 no title', () => {
      return superagent.put(`http://localhost:${process.env.PORT}/api/videogames`)
        .set('Content-Type', 'application/json')
        .send({
          console: 'ps4',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('should respond with a 400 no console', () => {
      return superagent.put(`http://localhost:${process.env.PORT}/api/videogames`)
        .set('Content-Type', 'application/json')
        .send({
          title: 'The Last of Us',
          genre: 'action',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('invalid ID', () => {
      return superagent.put(`http://localhost:${process.env.PORT}/api/videogames`)
        .set('Content-Type', 'application/json')
        .send({
          title: 'Portal',
          genre: 'puzzle',
          console: 'pc',
          id: 12345,
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });

    test('no ID', () => {
      return superagent.put(`http://localhost:${process.env.PORT}/api/videogames`)
        .set('Content-Type', 'application/json')
        .send({
          title: 'Portal',
          genre: 'puzzle',
          console: 'pc',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });
});


