var express = require('express');
var app = express();
var http = require('http').Server(app);
var cool = require('cool-ascii-faces');
var io = require('socket.io')(http);
var $ = require("jquery");
var passport = require('passport');


app.use('/static', express.static(__dirname + '/static'));
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
var mongoose = require('mongoose');
var configDB = require('./config.database.js')
mongoose.connect(process.env.MONGOHQ_URL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

var paypal_api = require('paypal-rest-sdk');

var config_opts = {
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
    'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
};

var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http:\/\/localhost\/test\/rest\/rest-api-sdk-php\/sample\/payments\/ExecutePayment.php?success=true",
        "cancel_url": "http:\/\/localhost\/test\/rest\/rest-api-sdk-php\/sample\/payments\/ExecutePayment.php?success=false"
    },
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
};

paypal_api.payment.create(create_payment_json, config_opts, function (err, res) {
    if (err) {
        throw err;
    }

    if (res) {
        console.log("Create Payment Response");
        console.log(res);
    }
});

require('./app/routes.js')(app, passport);
require('./config/passport')(passport);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(app.get("port"), function(){
  console.log('listening on *:5000');
});


