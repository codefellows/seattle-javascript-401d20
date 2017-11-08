import {rehydrateLocalStorage} from '../lib/redux-persist.js'

let initalState = rehydrateLocalStorage('profile', null)
export default (state=initalState, {type, payload}) => {
  switch(type){
    case 'PROFILE_SET':
      return payload
    case 'TOKEN_REMOVE':
      return null
    default:
      return state
  }
}

