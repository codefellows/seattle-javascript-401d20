const bstFind = (bst, value) => {
  if(!bst) return null
  if(bst.value == value) return bst
  if(bst.value > value) return bstFind(bst.left, value)
  return bstFind(bst.right, value)
}
