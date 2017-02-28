console.log("carduino v0.0.1")
console.log("github.com/bitlabio/carduino")

var express = require('express')
var app = express()

app.use(express.static('static'))

app.listen(3000, function () {
  console.log('Open http://localhost:3000/ in your browser.')
})