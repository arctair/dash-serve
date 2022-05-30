const http = require('http')
const port = process.env.PORT || 8080

function requestListener(request, response) {
  console.log('hello logs')
  response.write('hello world')
  response.end()
}

const server = http.createServer(requestListener)
server.listen(port)
