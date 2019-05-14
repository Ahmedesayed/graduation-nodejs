var express = require('express');
var app = express();
var bodyParser = require('body-parser')
// var server = require('http').createServer(app);
var WebSocket = require('ws')
var wss = new WebSocket.Server({ port: 8080 })
app.listen(80, () => {
    console.log('Welcome to our server at ' + 80);
});

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello To Our Graduation Project Guest !')
})

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  ws.send('ho!')
})

