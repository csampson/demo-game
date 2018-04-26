'use strict'

const { Server, OPEN: STATE_OPEN } = require('uws')
const server = new Server({ port: 3000 })

server.on('connection', socket => {
  socket.on('message', (message) => {
    console.log(message)

    server.clients.forEach(client => {
      if (client.readyState === STATE_OPEN) {
        client.send(message)
      }
    })
  })
})

server.broadcast = (message) => {
  server.clients.forEach(client => {
    if (client.readyState === STATE_OPEN) {
      client.send(message)
    }
  })
}
