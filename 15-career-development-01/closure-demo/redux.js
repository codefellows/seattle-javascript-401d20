'use strict'

// a reducers job is to define the initial state
// and any interactions to the state
createStore = (reducer) => {
  let state = reducer(undefined, {})
  let subscribers = []
  return {
    getState: () => state,
    subscribe: (cb) => {
      subscribers.push(cb)
    },
    dispatch: (action) => {
      state = reducer(state, action)
      subscribers.forEach(cb => cb())
    },
  }
}

countReducer = (state=0, action) => {
  switch(action.type){
    case 'INC': 
      return state + 1
    case 'DEC': 
      return state - 1
    default: 
      return state
  }
}


store = createStore(countReducer)

store.subscribe(() => {
  console.log('__booyea__', store.getState())
})


store.dispatch({type: 'DEC'})

store.getState()

