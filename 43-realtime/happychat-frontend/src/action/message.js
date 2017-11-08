import realtime from '../lib/realtime.js'
// sync
export const create = (message) => ({
  type: 'MESSAGE_CREATE',
  payload: message,
})

// async
export const createRequest = (message) => (store) => {
  // replace with socket.io tomorrow
  let {profile} = store.getState()

  realtime.emit('MESSAGE_CREATE', {
    profile,
    content: message.content,
  })
}

