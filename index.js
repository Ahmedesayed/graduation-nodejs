var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.get('/places/:id', function (req, res) {
    var id = req.params.id;
    var p = req.params.p;
    res.send(id+p)
  })
   
  app.post('/places', function (req, res) {
      var body = req.body;
      res.send(body)
  })
   
app.listen(3000||process.env);