var express = require('express');
var app = express();
<<<<<<< HEAD
var http = require('http').Server(app);
var cool = require('cool-ascii-faces');
var io = require('socket.io')(http);
var $ = require('jquery');


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
=======
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
var pg = require('pg');





//database
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOHQ_URL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

var memberSchema = new mongoose.Schema({
  name: {
    first: String,
    last: { type: String, trim: true }
  },
  age: { type: Number, min: 0 },
  email: String

});





var member = mongoose.model('member', memberSchema);
var test = new member ({
  name: { first: 'John', last: 'Doe'},
  age: 25
});

test.save(function (err) {if (err) console.log ('Error on save!')});
//database



var lol = db.member.find( { name: { first: 'John' } } )
>>>>>>> 8c888523b21a15a35bd1c9e0f3dbd7af3421ec0a


app.get('/', function(request, response) {
  var test = process.env.MONGOHQ_URL;
  var times = process.env.TIMES

  response.send(test);
});

<<<<<<< HEAD
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
=======
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
>>>>>>> 8c888523b21a15a35bd1c9e0f3dbd7af3421ec0a
});
