'use strict'

createStore = (reducer) => {
  let state = reducer(undefined, {type: ''})
  let subscribers = []
  return {
    getState: () => state,
    subscribe: (callback) => {
      subscribers.push(callback)
    },
    dispatch: (action) => {
      // update state 
      state = reducer(state, action)
      // invoke subscribers
      subscribers.forEach(cb => cb())
      // return action
      return action
    },
  }
}

counterReducer = (state=0, {type, payload}) => {
  switch(type){
    case 'INC':
      return state + 1
    default: 
      return state
  }
}

titleReducer = (state='', {type, payload}) => {
  switch(type){
    case 'TITLE_SET':
      return payload
    default: 
      return state
  }
}

emptyState = {
  counter: counterReducer(undefined, {type: ''}),
  title: titleReducer(undefined, {type: ''}),
}
reducer = (state=emptyState, action) => {
  return {
    counter: counterReducer(state.counter, action),
    title: titleReducer(state.title, action),
  }
}

combineReducers = (reducers) => {
  let emptyState = Object.keys(reducers).reduce((empty, name) => {
    return {...empty, [name]: reducers[name](undefined, {type: ''})}
  })
  return (state=emptyState, action) => {
    return Object.keys(reducers).reduce((result, name) => {
     return {...result, [name]: reducers[name](state[name], action)}
    }, {})
  }
}

cReducer = combineReducers({
  counter: counterReducer, 
  title: titleReducer,
})

store = createStore(cReducer)

store.getState()

store.dispatch({type: 'INC'})

store.dispatch({type: 'TITLE_SET', payload: 'slug blog'})

store.getState()

store.subscribe(() => {
  console.log('updated')
})


store.subscribe(() => {
  console.log('booyea')
})
