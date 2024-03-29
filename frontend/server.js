const http = require('http')
const fs = require('fs')
const path = require('path')

const port = 15000

http.createServer((req, res) => {
    const file = req.url === '/' ? 'index.html' : req.url
    const filePath = path.join(__dirname, 'src', file)
    const extname = path.extname(filePath)

    const allowedFileTypes = ['.html', '.css', '.js']
    const allowed = allowedFileTypes.find(item => item += extname)

    if (!allowed) return

    fs.readFile(
        filePath,
        (err, content) => {
            if (err) throw err;

            res.end(content)
            if (req.url === '/') {
                console.log(`cheguei, sou o "/"`)
            }
        }
    )
}).listen(port, () => {
    console.log(`Deu certo`)
})