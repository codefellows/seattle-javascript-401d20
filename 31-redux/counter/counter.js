'use strict'

let {createStore} = require('redux')

// a function that takes in a prevState, action and returns a new State
// it should difine the interactions to the state based off action types
reducer = (state=0, action) => {
  let {type, payload} = action
  switch(type){
    case 'INC':
      return state + 1
    case 'DEC':
      let amount = payload || 1
      return state - amount
    default:
      return state
  }
}

// how redux calls the reducer to get the intial state
//state = reducer(undefined, {type: undefined})

//state

//state = reducer(state, {type: 'INC'})

//state = reducer(state, {type: 'DEC'})

//state = reducer(state, {type: 'DEC', payload: 10})

store = createStore(reducer)

store.getState()


store.dispatch({type: 'INC'})

store.dispatch({type: 'DEC', payload: 2})

store.dispatch({type: 'lulwat'})

store.subscribe(() => {
  //<App state={store.getState()} />
})
