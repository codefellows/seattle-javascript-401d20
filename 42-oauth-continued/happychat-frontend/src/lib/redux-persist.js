import {cookieFetch} from './util.js'

// perset certain keys from the store
export const persist = keys => store => next => action => {
  // update store
  let result = next(action)
  // get State
  let state = store.getState()
  // persist the correct keys 
  keys.forEach(key => {
    window.localStorage[key] = JSON.stringify(state[key])
  })

  return result
}

// initialize store state from local storage or have a default
export const rehydrateLocalStorage = (key, intialState) => {
  try {
    return JSON.parse(window.localStorage[key]) 
  } catch(err) {
    return intialState
  }
}

export const rehydrateCookie = (key, intialState) => {
  return cookieFetch(key) || intialState
}

