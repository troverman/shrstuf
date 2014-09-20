var express = require('express');
var app = express();
var http = require('http').Server(app);
var cool = require('cool-ascii-faces');
var io = require('socket.io')(http);
var $ = require('jquery');


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);


app.get('/', function(request, response) {
  response.send(cool());
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


http.listen(5000, function(){
  console.log('listening on *:5000');
});

app.get('/about', function (req, res)
{
    res.render('about.html');
});
app.get('/chat', function (req, res)
{
    res.render('chat.html');
});
