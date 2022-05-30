const fs = require('fs')
const http = require('http')
const port = process.env.PORT || 8080

function requestListener(request, response) {
  const urlComponents = request.url.split('/')
  const fileName = urlComponents[urlComponents.length - 1]
  const filePath = `${process.env.DASH_DIR}/${fileName}`
  if (fileName.endsWith('.mpd')) {
    fs.readFile(filePath, function (error, data) {
      if (error) {
        response.writeHead(500)
        response.end(error.message)
      } else {
        response.writeHead(200)
        response.end(data)
      }
    })
  } else if (fileName.endsWith('.m4s')) {
    response.write('yes this is an m4s')
    response.end()
  } else {
    response.writeHead(404)
    response.end()
  }
}

const server = http.createServer(requestListener)
server.listen(port)
