const dotenv = require('dotenv').config()
const http = require('http')
const app = require('./app')

const port = process.env.PORT || process.env.LocalPort

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`Now listening on port ${port}`)
})

module.exports = port
