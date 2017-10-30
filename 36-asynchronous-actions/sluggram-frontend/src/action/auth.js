import superagent from 'superagent'

// sync
export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token,
})

export const tokenRemove = () => ({
  type: 'TOKEN_REMOVE',
})

// async
export const signup = (user) => (store) => {
  return superagent.post(`${__API_URL__}/signup`)
  .send(user)
  .withCredentials()
  .then(res => {
    console.log({res})
    return store.dispatch(tokenSet(res.text))
  })
}

export const login = (user) => (store) => {
  return superagent.get(`${__API_URL__}/login`)
  .auth(user.username, user.password)
  .withCredentials()
  .then(res => {
    console.log({res})
    return store.dispatch(tokenSet(res.text))
  })
}
