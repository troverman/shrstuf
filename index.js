
require('./models/models.js')
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


//app.use( express.json());
//app.use( express.urlencoded());
//app.use( express.methodOverride());

//
//app.use(passport.initialize());
//app.use(passport.session());

//routes and controllers
app.use('/about', require('./controllers/about'));
app.use('/api', require('./controllers/api'));
app.use('/chat', require('./controllers/api'));

app.use('/discover', require('./controllers/discover'));
app.use('/', require('./controllers/index'));
app.use('/member', require('./controllers/member'));
app.use('/project', require('./controllers/project'));
app.use('/search', require('./controllers/search'));


//socket-io
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

server.listen(app.get("port"), function(){
  console.log('listening on *:5000');
});


