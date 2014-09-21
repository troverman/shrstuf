module.exports = function(app, passport) {


app.get('/', function(req, res) {
    res.render('index.ejs')
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
