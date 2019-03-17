var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(process.env.PORT || 4000, () => {
    console.log('Welcome to our server at ' + 4000);
});

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World')
})

io.on('connection', client => {
    client.emit('connected','hello in sockets')
    client.on('event', data => { console.log(data) });
    client.on('disconnect', () => { console.log('disconnected') });
});
