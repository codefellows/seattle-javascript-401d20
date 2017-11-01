const data = {
	value: 1, 
	left: {
		value: 2,
		left: {value: 4},
		right: {value: 5},
    },
	right: {
		value: 3,
		left: {value: 6},
		right: {value: 7},
    },
}

const queue = () => {
  let state = []
  return {
    enqueue: (value) => state.push(value),
    dequeue: () => state.shift(),
    isEmpty: () => !state.length,
  }
}

const breadthPrint = (node) => {
  let q = queue()
  q.enqueue(node)
  while(!q.isEmpty()){
    let next = q.dequeue()
    console.log(next.value)
    if(next.left) q.enqueue(next.left)
    if(next.right) q.enqueue(next.right)
  }
}

breadthPrint(data)
