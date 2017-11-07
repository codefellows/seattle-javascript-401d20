// sync
export const create = (message) => ({
  type: 'MESSAGE_CREATE',
  payload: message,
})

// async
export const createRequest = (message) => (store) => {
  // replace with socket.io tomorrow
  let {profile} = store.getState()
  return store.dispatch(create({
    content: message.content,
    username: profile.username,
    timestamp: new Date(),
  }))
}
