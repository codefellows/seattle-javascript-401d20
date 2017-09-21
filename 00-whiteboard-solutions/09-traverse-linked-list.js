'use strict'

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
