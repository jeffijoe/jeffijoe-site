const http = require('http')
const fs = require('fs')

const contentTypes = [
  [/html$/i, 'text/html; charset=utf8'],
  [/css$/i, 'text/css'],
  [/.*/, 'application/octet-stream']
]

const cb = (req, res) => {
  res.statusCode = 200
  const url = req.url === '/' ? '/index.html' : req.url
  const file = url.substring(1)
  res.setHeader('Content-Type', contentTypes.find(([rex]) => rex.test(file))[1])
  fs.exists(file, (exists) => {
    if (!exists) {
      res.statusCode = 404
      res.end('Not found')
    }
    fs.createReadStream(file).pipe(res)
  })
}

http.createServer(cb).listen(1400, () => {
  console.log('Dev server running.')
})
