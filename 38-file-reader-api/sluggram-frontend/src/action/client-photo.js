import superagent from 'superagent'

// sync
export const set = (photos) => ({
  type: 'CLIENT_PHOTOS_SET',
  payload: photos,
})

export const create = (photo) => ({
  type: 'CLIENT_PHOTO_CREATE',
  payload: photo,
})

export const remove = (photo) => ({
  type: 'CLIENT_PHOTO_REMOVE',
  payload: photo,
})

// async
export const fetchRequest = () => (store) => {
  let {token} = store.getState()
  return superagent.get(`${__API_URL__}/photos`)
  .set('Authorization', `Bearer ${token}`)
  .then(res => {
    return store.dispatch(set(res.body.data))
  })
}

export const createRequest = (photo) => (store) => {
  let {token} = store.getState()
  return superagent.post(`${__API_URL__}/photos`)
  .set('Authorization', `Bearer ${token}`)
  .field('description', photo.description)
  .attach('photo', photo.photo)
  .then(res => {
    return store.dispatch(create(res.body))
  })
}

export const removeRequest = (photo) => (store) => {
  let {token} = store.getState()
  return superagent.delete(`${__API_URL__}/photos/${photo._id}`)
  .set('Authorization', `Bearer ${token}`)
  .then(res => {
    return store.dispatch(remove(photo))
  })
}

