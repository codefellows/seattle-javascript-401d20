'use strict'

const printBinaryTree = (root) => {
  if(!root) return
  console.log(root.value) 
  if(root.left) printBinaryTree(root.left)
  if(root.right) printBinaryTree(root.right)
}
