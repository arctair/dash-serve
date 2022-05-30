const fs = require('fs')
const http = require('http')
const port = process.env.PORT || 8080

function requestListener(request, response) {
  const urlComponents = request.url.split('/')
  const fileName = urlComponents[urlComponents.length - 1]
  const filePath = `${process.env.DASH_DIR}/${fileName}`
  if (fileName.endsWith('.mpd')) {
    copyFileToResponse(filePath, response)
  } else if (fileName.endsWith('.m4s')) {
    const filePathTmp = `${filePath}.tmp`
    if (fs.existsSync(filePath)) {
      copyFileToResponse(filePath, response)
    } else if (fs.existsSync(filePathTmp)) {
      copyFileToResponse(filePathTmp, response)
    }
  } else {
    response.writeHead(404)
    response.end()
  }
}

function copyFileToResponse(filePath, response) {
  fs.readFile(filePath, function (error, data) {
    if (error) {
      response.writeHead(500)
      response.end(error.message)
    } else {
      response.writeHead(200)
      response.end(data)
    }
  })
}

const server = http.createServer(requestListener)
server.listen(port)
