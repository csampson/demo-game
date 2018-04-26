'use strict'

const { Server } = require('uws')
const server = new Server({ port: 3000 })

function onMessage (message) {
  console.log(message)
}

server.on('connection', socket => {
  socket.on('message', onMessage)
})
