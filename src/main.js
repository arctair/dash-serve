const fs = require('fs')
const http = require('http')
const port = process.env.PORT || 8080

function requestListener(request, response) {
  const urlComponents = request.url.split('/')
  const last = urlComponents[urlComponents.length - 1]
  if (last.endsWith('.mpd')) {
    const manifestPath = `${process.env.DASH_DIR}/${last}`
    fs.readFile(manifestPath, function (error, data) {
      if (error) {
        response.writeHead(500)
        response.end(error.message)
      } else {
        response.writeHead(200)
        response.end(data)
      }
    })
  } else {
    response.write('hello world')
    response.end()
  }
}

const server = http.createServer(requestListener)
server.listen(port)
