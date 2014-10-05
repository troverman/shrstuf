var express = require('express');
var http = require('http');
var io = require('socket.io')(http);


var router = express.Router();

router.get('/', function (req, res){
    res.render('chat');
});

//socket-io
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

module.exports = router;
