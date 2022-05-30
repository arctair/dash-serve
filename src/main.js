const http = require('http')
const port = process.env.PORT || 8080

function serverFn(request, response) {
  response.write('hello world')
  response.end()
}

const server = http.createServer(serverFn)
server.listen(port)
