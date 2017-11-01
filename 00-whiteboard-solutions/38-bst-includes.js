const data = {
	value: 10, 
	left: {
		value: 8,
		left: {value: 3},
		right: {value: 9},
  },
	right: {
		value: 15,
		left: {value: 11},
		right: {value: 20},
  },
}

const includes = (bst, value) => {
  if(!bst)
    throw new Error('bst is required')
  if(value == bst.value) {
    return true
  } else if(value < bst.value) {
    if(bst.left)
      return includes(bst.left, value)
  } else  {
    if(bst.right)
      return includes(bst.right, value)
  }
  return false
}

// includes(data, 20) // true
// includes(data,-1) // false
