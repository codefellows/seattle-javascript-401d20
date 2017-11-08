import superagent from 'superagent'

// sync 
export const set = (profile) => ({
  type: 'PROFILE_SET',
  payload: profile,
})

// async
export const fetchRequest = () => (store) => {
  let {token} = store.getState()
  return superagent.get(`${__API_URL__}/profiles/me`)
  .set('Authorization', `Bearer ${token}`)
  .then(res => {
    return store.dispatch(set(res.body))
  })
}
