// dependices
const server = require('./lib/server.js')

// module functionality
server.start(3000, () => {
  console.log('server runnning on port', 3000)
})

