'use strict'

const { Server, OPEN: STATE_OPEN } = require('uws')
const server = new Server({ port: 3000 })

server.on('connection', socket => {
  socket.isAlive = true

  socket.on('pong', () => {
    this.isAlive = true
  })

  socket.on('message', (message) => {
    console.log(message)

    server.clients.forEach(client => {
      if (client.readyState === STATE_OPEN) {
        client.send(message)
      }
    })
  })

  setInterval(() => {
    server.clients.forEach(client => {
      if (!client.isAlive) {
        return socket.terminate()
      }

      socket.isAlive = false
      socket.ping(() => {})
    })
  }, 1000)
})

server.broadcast = (message) => {
  server.clients.forEach(client => {
    if (client.readyState === STATE_OPEN) {
      client.send(message)
    }
  })
}
