'use strict';

const VideoGame = require('../model/videogame.js');
const router = require('../lib/router.js');
const storage = require('../lib/storage.js');

let sendStatus = (res, status, message) => {
  console.error('__REQUESTS_ERROR__', message);
  res.writeHead(status);
  res.end();
};

let sendJSON = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(data));
};

router.post('/api/videogames', (req, res) => {
  if(!req.body)
    return sendStatus(res, 400, 'no body found');
  if(!req.body.title)
    return sendStatus(res, 400, 'no title found');
  if(!req.body.genre)
    return sendStatus(res, 400, 'no genre found');
  if(!req.body.console)
    return sendStatus(res, 400, 'no console found');

  let videogame = new VideoGame(req.body);

  // persist the note
  storage.setItem(videogame)
    .then(note => {
      return sendJSON(res, 200, note);
    })
    .catch(err => {
      console.error(err);
      return sendStatus(res, 500);
    });
});

router.get('/api/videogames', (req, res) => {

  if(req.url.query.id){
    // An ID was supplied, get it!
    storage.fetchItem(req.url.query.id)
      .then(note => sendJSON(res, 200, note))
      .catch(err => {
        console.error(err);
        if(err.message.indexOf('not found') > -1)
          return sendStatus(res, 404, 'id did not match any videogame');
        sendStatus(500);
      });
  } else {
    // No ID provided, send all videogames
    storage.fetch()
      .then(notes => sendJSON(res, 200, notes))
      .catch(err => {
        console.error(err);
        sendStatus(res, 500);
      });
  }
});

router.delete('/api/videogames', (req, res) => {

  if(req.url.query.id){
    // An ID was supplied, delete it!
    storage.deleteItem(req.url.query.id)
      .then(() => sendStatus(res, 204, 'videogame removed'))
      .catch(err => {
        console.error(err);
        if(err.message.indexOf('not found') > -1)
          return sendStatus(res, 404, 'id did not match any videogame');
        sendStatus(500);
      });
  } else {
    // Dont let them delete all videogames!
    sendStatus(res, 400, 'no id found');
  }
});

router.put('/api/videogames', (req, res) => {
  if(!req.body)
    return sendStatus(res, 400, 'no body found');
  if(!req.body.title)
    return sendStatus(res, 400, 'no title found');
  if(!req.body.genre)
    return sendStatus(res, 400, 'no genre found');
  if(!req.body.console)
    return sendStatus(res, 400, 'no console found');
  if(!req.body.id)
    return sendStatus(res, 400, 'request must have id');

  storage.updateItem(req.body)
    .then(() => sendStatus(res, 200, 'videogame updated'))
    .catch(err => {
      if(err.message.indexOf('not found') > -1)
        return sendStatus(res, 404, 'id did not match any videogame');
      sendStatus(res, 500);
    });
});
