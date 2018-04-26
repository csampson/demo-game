const SERVER_URL = 'ws://localhost:3000'

const server = new window.WebSocket(SERVER_URL)
const screen = document.querySelector('.screen')

server.onopen = (event) => {
  screen.setAttribute('data-status', 'ready')

  document.addEventListener('click', () => {
    server.send('<message>')
  })

  server.onmessage = (message) => {
    screen.innerText += `\n${message.data}`
  }
}
