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
})

app.get('/create', function(req,res) {
	res.render('create');
})

app.get('/:location', function(req,res) {
	console.log(req.params.location);
	Post.find({'city': req.params.location}, function(err, posts) {
		if (err) { 
			console.log('error getting posts for', req.params.location, '\n' + err)
			res.render('results', {posts: '', location: req.params.location});
		}
		console.log(posts, typeof posts);
		res.render('results', {posts: posts, location: req.params.location});
	});
});

app.use(function(req, res){
    res.status(404).render('404');
});

////////////////////LISTENING/////////////////////
app.listen(process.env.PORT || 3000, function(){
	console.log('Listening...');
});