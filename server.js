var express = require('express')
var server  = express()
server.listen(3700)

server.use( express.static('.') )
