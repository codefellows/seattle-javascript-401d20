'use strict'

const uuid = require('uuid/v1')

class Note {
  constructor(options){
    this.id = uuid()
    this.timestamp = new Date()
    this.title = options.title || ''
    this.content = options.content || ''
  }
}

module.exports = Note

//function Note(title, content){
  //this.title = title
  //this.content = content
//}

//Note.prototype.toString = function(){
    //return this.title + '\n' + this.content
//}
