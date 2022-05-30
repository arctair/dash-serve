const http = require('http')
const port = process.env.PORT || 8080

function requestListener(request, response) {
  const urlComponents = request.url.split('/')
  const last = urlComponents[urlComponents.length - 1]
  console.log(last)
  response.write('hello world')
  response.end()
}

const server = http.createServer(requestListener)
server.listen(port)
