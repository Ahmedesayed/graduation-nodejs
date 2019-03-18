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
io.of('/flutter').on("connection",client=>{
    console.log('connected with id '+client.id)
    client.on('event', data => {
        client.emit('connected',data)
    });
    client.on('disconnect', () => { console.log('disconnected') });
})
io.on('connection', client => {
    console.log('connected with id '+client.id)
    client.on('event', data => {
        client.emit('connected',data)
    });
    client.on('disconnect', () => { console.log('disconnected') });
});
