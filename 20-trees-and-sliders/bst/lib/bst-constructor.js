'use strict'

class BST {
  constructor(value){
    this.value = value
    this.left = null
    this.right = null
  }

  insert(node){
    if(!(node instanceof BST))
      throw new Error('node must be a bst')
    // node has {value, left, right}
    if(node.value === this.value)
      return 
    if(node.value < this.value){
      if(!this.left){
        this.left = node
        return
      }
      this.left.insert(node)
      return
    }
    if(!this.right){
      this.right = node
      return
    }
    this.right.insert(node)
  }
}

module.exports = BST
