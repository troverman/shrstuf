var express = require('express');
var app = express();
var http = require('http').Server(app);
var cool = require('cool-ascii-faces');
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

/*var mongoose = require('mongoose');
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
//database/ 
*/

app.get('/', function(req, res) {
    res.send("Hello World!");
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


app.get('/about', function (req, res)
{
    res.render('about.html');
});

app.get('/chat', function (req, res)
{
    res.render('chat.html');
});


app.get('/project', function (req, res){
    res.render('project.html');
});

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %d', server.address().port);
});


