import realtime from '../lib//realtime.js'
import * as message from '../action/message.js'

export default (store) => {
  realtime.on('MESSAGE_CREATE', (msg) => store.dispatch(message.create(msg)))
}
