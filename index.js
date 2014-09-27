/*
set up addons
*/

var express = require('express');
var app = express();
var http = require('http');
var passport = require('passport');
var cool = require('cool-ascii-faces');
var io = require('socket.io')(http);
var $ = require('jquery');
var server = http.createServer(app);

app.use('/static', express.static(__dirname + '/static'));
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOHQ_URL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    var projectSchema = new mongoose.Schema({
        title:  String,
        author: String,
    });
    var member = mongoose.model('member', projectSchema);
});

exports.create = function ( req, res ){
  new Todo({
    content    : req.body.content,
    updated_at : Date.now()
  }).save( function( err, todo, count ){
    res.redirect( '/' );
  });
};

require('./app/routes.js')(app, passport);
require('./app/models/models.js')



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


