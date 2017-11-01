import {cookieDelete} from '../lib/util.js'
import superagent from 'superagent'

// sync
export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token,
})

export const tokenRemove = () => ({
  type: 'TOKEN_REMOVE',
})

export const logout = () => {
  cookieDelete('X-Sluggram-Token')
  return tokenRemove()
}

// async
export const signup = (user) => (store) => {
  return superagent.post(`${__API_URL__}/signup`)
  .send(user)
  .withCredentials()
  .then(res => {
    return store.dispatch(tokenSet(res.text))
  })
}

export const login = (user) => (store) => {
  return superagent.get(`${__API_URL__}/login`)
  .auth(user.username, user.password)
  .withCredentials()
  .then(res => {
    return store.dispatch(tokenSet(res.text))
  })
}
