'use strict'

//class SLL {
  //constructor(value){
    //this.next = null
    //this.value = value
  //}
//}

const sll = (value) => ({next: null, value})

stack = () => {
  let state = null
  return {
    push: (value) => {
      if(!state){
        state = sll(value)
      } else {
        let top = sll(value)
        top.next = state
        state = top
      }
    },
    pop: () => {
      if(!state) return
      let result  = state.value
      state = state.next
      return result
    },
    peek: () => state ? state.value : undefined,
  }
}
