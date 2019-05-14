var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var server = require('http').createServer(app);
const io = require('socket.io')(server);
var http = require("http")
var url  = require("url")

var proxy = url.parse(process.env.PROXIMO_URL)

var  options ={ 
    hostname: proxy.hostname,
    port:     proxy.port || 80,
    path:     "https://graduation-project12.herokuapp.com",
    headers: {
      "Proxy-Authorization": `Basic ${new Buffer(proxy.auth).toString("base64")}`
    }
}

http.get(options,(res)=>{
    console.log ("status code", res.statusCode)
    console.log ("headers", res.headers)
})


// app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World')
})

io.on('connection', client => {
    console.log('connected with id ' + client.id)
    client.on('chat_direct', data => {
        io.emit('message_sent',data);
    });
    client.on('disconnect', () => { console.log('disconnected') });
});

app.listen(process.env.PORT || 4000, () => {
    console.log('Welcome to our server at ' + 4000);
});