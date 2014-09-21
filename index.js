var express = require('express');
var app = express();
var http = require('http').Server(app);
var cool = require('cool-ascii-faces');
var io = require('socket.io')(http);
var $ = require("jquery");


app.use('/static', express.static(__dirname + '/static'));
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOHQ_URL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

/*var memberSchema = new mongoose.Schema({
  name: {
    first: String,
    last: { type: String, trim: true }
  },
  email: String
  member_name: String
});

var projectSchema = new mongoose.Schema({
  title:  String,
  author: String,
});

var transactionSchema = new mongoose.Schema({
  member_send: String,
  member_receive: String,
  project: String,
  currency_array: String,
  currency_value_array:String,
});


var member = mongoose.model('member', memberSchema);
var test = new member ({
  name: { first: 'John', last: 'Doe'},
  age: 25
});



test.save(function (err) {if (err) console.log ('Error on save!')});*/




app.get('/', function(req, res) {
    res.render('index.html')
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

app.get('/account', function (req, res)
{
    res.render('account.html');
});

app.get('/api', function (req, res)
{
    res.render('api.html');
});

app.get('/chat', function (req, res)
{
    res.render('chat.html');
});

app.get('/discover', function (req, res)
{
    res.render('discover.html');
});

app.get('/member', function (req, res)
{
    res.render('member.html');
});

app.get('/project', function (req, res){
    res.render('project.html');
});

app.get('/search', function (req, res){
    res.render('search.html');
});


http.listen(app.get("port"), function(){
  console.log('listening on *:5000');
});


