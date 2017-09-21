'use strict'

// traverse the following data and print out each value
// let data = {
//   value: 3, 
//   next: {
//     value: 8, 
//     next: {
//       value: 11, 
//       next: null,
//     },
//   },
// }

const solutionA = (list) => {
  while(list){
    console.log(list.value)
    list = list.next
  }
}

const solutionB = (list) => {
  if(!list) return
  console.log(list.value)
  solutionB(list.next)
}
