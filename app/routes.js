module.exports = function(app, passport) {

app.get('/', function(req, res) {
    res.render("index");
});

app.get('/about', function (req, res){
    res.render("about");
});

app.get('/account', function (req, res){
    res.render('account');
});

app.get('/api', function (req, res){
    res.render('api');
});

app.get('/chat', function (req, res){
    res.render('chat');
});

app.get('/discover', function (req, res){
    res.render('discover');
});

app.get('/member', function (req, res){
    res.render('member');
});

app.get('/project', function (req, res){
    res.render('project');
});

app.get('/search', function (req, res){
    res.render('search');
});

var projectSchema = new mongoose.Schema({
  title:  String,
  author: String,
});

app.get('/test', function (req, res){
    //mongoose.model('member').find(function(err, member)){
        //res.send('test');
    //});
});

//test
//test



// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/profile', // redirect to the secure profile section
	failureRedirect : '/signup', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));


};

function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
