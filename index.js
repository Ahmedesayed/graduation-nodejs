var express = require('express');
var app = express();
var bodyParser = require('body-parser')
// var server = require('http').createServer(app);
// const io = require('socket.io')(server);
var http, options, proxy, url;

http = require("http");

url = require("url");

proxy = url.parse(process.env.QUOTAGUARDSTATIC_URL);
target  = url.parse("http://ip.quotaguard.com/");
console.log(target)
options = {
  hostname: proxy.hostname,
  port: proxy.port || 80,
  path: target.href,
  headers: {
    "Proxy-Authorization": "Basic " + (new Buffer(proxy.auth).toString("base64")),
    "Host" : target.hostname
  }
};

http.get(options, function(res) {
  res.pipe(process.stdout);
  return console.log("status code", res.statusCode);
});


// app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World')
})

// io.on('connection', client => {
//     console.log('connected with id ' + client.id)
//     client.on('chat_direct', data => {
//         io.emit('message_sent',data);
//     });
//     client.on('disconnect', () => { console.log('disconnected') });
// });

app.listen(process.env.PORT || 4000, () => {
    console.log('Welcome to our server at ' + 4000);
});