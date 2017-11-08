import io from 'socket.io'
import {randomBytes} from 'crypto'


export default (http) => {
  const chatroom = io(http).on('connection', (socket) => {

    // subscibte to client events
    socket.on('MESSAGE_CREATE', (message) =>  {
      chatroom.emit('MESSAGE_CREATE', {
        ...message,
        id: randomBytes(8).toString('hex'),
        timestamp: new Date(),
      })
    })

  })
  .on('error', error => {
    console.error('REALTIME_ERROR', error)
  })
  return http
}
