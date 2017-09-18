// load envornment
// require node dependieces
const net = require('net')
const faker = require('faker')

// create module globals (constants)
const app = net.createServer()
let clients = []

// define module functionality
app.on('connection', (socket) => {
  //console.log('booyea', socket)
  socket.nickname = faker.internet.userName()
  clients.push(socket)
  socket.write('welcome to the chatroom!\n')
  socket.write(`you nickname is ${socket.nickname}\n`)

  socket.on('data', (data) => {
    let message = data.toString().trim()
    if(message.startsWith('@')){
      let words = message.split(' ')
      let command = words[0]
      let value = words.slice(1).join(' ')
      switch(command){
        case '@list':
          let nicknames = clients.map(c => c.nickname)
          socket.write(nicknames.join('\n') + '\n')
          return
        case '@nickname':
          socket.write('under construction\n')
          return
        default:
          socket.write('try @list or @nickname\n')
      }
    }

    clients.forEach((client) => {
      if(client !== socket)
        client.write(`${socket.nickname}: ${message}\n`)
    })
  })

  let removeClient = (socket) => () => {
    clients = clients.filter((client) => {
      return client !== socket
    })
  }

  socket.on('error', removeClient(socket))
  socket.on('close', removeClient(socket))
})

app.on('error', (err) => {
  console.error('__SERVER_ERROR__', err)
})

// export interface
module.exports = {
  start: (port, callback) => app.listen(port, callback),
  stop: (callback) => app.close(callback),
}
