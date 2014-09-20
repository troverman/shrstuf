var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');
var pg = require('pg');






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
  age: { type: Number, min: 0 }
});

var member = mongoose.model('member', memberSchema);
var test = new member ({
  name: { first: 'John', last: 'Doe'},
  age: 25
});

test.save(function (err) {if (err) console.log ('Error on save!')});





app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  var result = '';
  var test = process.env.MONGOHQ_URL;
  var times = process.env.TIMES || 100
  for (i=0; i < times; i++)
    result += cool();


  member.find({}).exec(function(err, result) {
    if (!err) {
      var query = PUser.find({'name.last': 'Doe'});
      response.send(query);
    } else {
      res.end('Error in first query. ' + err)
    };
  });

  response.send(test);


});



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
