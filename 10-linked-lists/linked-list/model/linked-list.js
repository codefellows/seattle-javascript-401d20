'use strict'

class LinkedList {
  constructor(value){
    this.value = value 
    this.next = null
  }

  append(node){
    if(!(node instanceof LinkedList))
      throw new Error('USAGE ERROR: node must be a LinkedList')
    if(!this.next)
      this.next = node
    else 
      this.next.append(node)

    return this
  }

  remove(node){
    if(!(node instanceof LinkedList))
      throw new Error('USAGE ERROR: node must be a LinkedList')

    if(!this.next){
      return this
    } else if (this.next === node){
      this.next = this.next.next
    } else {
      this.next.remove(node)
    }

    return this
  }
}

module.exports = LinkedList

