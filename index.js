
require('./app/models/models.js')
var express = require('express');
var app = express();
var http = require('http');
var passport = require('passport');
var io = require('socket.io')(http);
var $ = require('jquery');
var server = http.createServer(app);


app.use('/static', express.static(__dirname + '/static'));
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use( express.json());
app.use( express.urlencoded());
app.use( express.methodOverride());


require('./app/routes.js')(app, passport);


//app.get('/test', function (req, res){
//    mongoose.model('member').find(function(err, member)){
//        res.send('test');
//    });
//});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

server.listen(app.get("port"), function(){
  console.log('listening on *:5000');
});


