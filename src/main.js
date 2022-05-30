const http = require('http')

function serverFn(request, response) {
  response.write('hello world')
  response.end()
}

const server = http.createServer(serverFn)
server.listen(8080)
