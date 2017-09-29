'use strict'

module.exports =  class Stack {
  constructor(){
    this.length = 0
  }

  push(value){
    this[this.length++] = value
  }

  pop(){
    if(this.length === 0)
      return 
    let result = this[--this.length]
    delete this[this.length]
    return result
  }

  peek(){
    return this[this.length - 1]
  }
}

