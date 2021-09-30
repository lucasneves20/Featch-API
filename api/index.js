const http = require('http')
const URL = require('url')
const data = require('./urls.json')
const fs = require('fs')
const path = require('path')
const port = 19009

function writeFile(callback, msg) {
    fs.writeFile(path.join(__dirname, "urls.json"),
        JSON.stringify(data, null, 2),
        err => {
            if (err) throw err

            callback(JSON.stringify({
                message: `${msg || 'ok'}`
            }))
        }
    )
}

http.createServer((req, res) => {
    const {
        name,
        url,
        del
    } = URL.parse(req.url, true).query

    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })

    // all resorces
    if (!name || !url) {
        return res.end(JSON.stringify(data))
    }

    if (del) {
        data.urls = data.urls.filter(item => String(item.url) !== String(url))

        return writeFile((message) => {
            res.end(message)
        })
    }

    data.urls.push({
        name,
        url
    })

    return writeFile((message) => {
        res.end(message)
    }, "criado com sucesso")
}).listen(port, () => console.log(`Deu certo`))