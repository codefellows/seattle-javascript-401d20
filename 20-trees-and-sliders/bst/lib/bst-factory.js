'use strict'

let isBST = (node) => {
  return node.hasOwnProperty('value') && node.hasOwnProperty('left') 
    && node.hasOwnProperty('right') && node.hasOwnProperty('insert')
}

module.exports = (value) => ({
  value,
  left: null,
  right: null,
  insert: function(node){
    if(!isBST(node))
      throw new Error('node must be a bst')
    if(node.value == this.value)
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
  },
})
