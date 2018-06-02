///////////////////LOAD MODULES///////////////////
require('dotenv').config(); //loads the .env
var express        = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var morgan         = require('morgan');
var Post           = require('./models/post');
var app            = express();

///////////////CONNECT TO DATABASE////////////////
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/travelBuddy');
mongoose.connect('mongodb://localhost/travelBuddy');

////////////////SET & USE MODULES/////////////////
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressLayouts);
app.use(morgan('tiny'));


app.use(express.static('public'));

/////////////////////ROUTES///////////////////////
app.get('/', function(req,res) {
	res.render('welcome');
});

app.get('/create', function(req,res) {
	res.render('create');
});

app.post('/create', function(req, res) {
	let activities = [];
	let newPost = new Post();
	let city = req.body.city.toLowerCase()
	// city.replace(/\s|-/g, '');
	activities.push(req.body.activityType);
	if (req.body.otherActivity !== '') { activities.push(req.body.otherActivity); }
	newPost.firstName = req.body.firstName;
	newPost.city = city;
	newPost.activityType = activities;
	newPost.activityDescription = req.body.activityDescription;
	newPost.methodOfContact = req.body.methodOfContact;
	newPost.language = req.body.language;
	newPost.ageRange = req.body.ageRange;
	newPost.startDate = req.body.startDate;
	newPost.endDate = req.body.endDate;
	newPost.save(function(err) {
		if (err) {
			console.log('######## error saving post to db:\n', err);
			res.send('error posting');
		}
	});
	res.send(newPost);
});

app.post('/:location/reply/:post', function(req, res) {
	Post.find({'city': req.params.location}, function(err, posts) {
		if (err) { 
			console.log('error getting posts for', req.params.location, '\n' + err)
			res.render('results', {posts: '', location: req.params.location});
		}
		res.send('temp');
		
	})
});

app.get('/:location', function(req,res) {
	// console.log(req.params.location);
	Post.find({'city': req.params.location}, function(err, posts) {
		if (err) { 
			console.log('error getting posts for', req.params.location, '\n' + err)
			res.render('results', {posts: '', location: req.params.location});
		}
		res.render('results', {posts: posts, location: req.params.location});
	});
});

app.use(function(req, res){
    res.status(404).send('404');
});

////////////////////LISTENING/////////////////////
app.listen(process.env.PORT || 3000, function(){
	console.log('Listening...');
});