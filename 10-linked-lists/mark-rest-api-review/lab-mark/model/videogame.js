'use strict';

const uuid = require('uuid/v1');

class VideoGame {
  constructor(options){
    this.id = uuid();
    this.timestamp = new Date();
    this.title = options.title;
    this.genre = options.genre;
    this.console = options.console;
  }
}

module.exports = VideoGame;
