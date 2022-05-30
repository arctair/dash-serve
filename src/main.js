const http = require('http')
const port = process.env.PORT || 8080

function serverFn(request, response) {
  console.log('hello logs')
  response.write('hello world')
  response.end()
}

const server = http.createServer(serverFn)
server.listen(port)
