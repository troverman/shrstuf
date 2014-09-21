module.exports = function(app, passport) {


app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/about', function (req, res)
{
    res.render('about.ejs');
});

app.get('/account', function (req, res)
{
    res.render('account.ejs');
});

app.get('/api', function (req, res)
{
    res.render('api.ejs');
});

app.get('/chat', function (req, res)
{
    res.render('chat.ejs');
});

app.get('/discover', function (req, res)
{
    res.render('discover.ejs');
});

app.get('/member', function (req, res)
{
    res.render('member.ejs');
});

app.get('/project', function (req, res){
    res.render('project.ejs');
});

app.get('/search', function (req, res){
    res.render('search.ejs');
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
