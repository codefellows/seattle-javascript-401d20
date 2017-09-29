'use strict'

// closure is when a function can remeber a refence to a variable defined in 
// the scope where the function was defined
module.exports = () => {
  let state = []
  return {
    push: (value) => {
      state.push(value)
    },
    pop: (value) => {
      return state.pop()
    },
    peek: (value) => {
      return state[state.length - 1]
    },
  }
}
