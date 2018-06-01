///////////////////LOAD MODULES///////////////////
require('dotenv').config(); //loads the .env
var express        = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser     = require('body-parser');
// var flash          = require('connect-flash');
var mongoose       = require('mongoose');
var morgan         = require('morgan');
// var User           = require('./models/user');
var app            = express();

///////////////CONNECT TO DATABASE////////////////
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/travelBuddy');

////////////////SET & USE MODULES/////////////////
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressLayouts);
app.use(morgan('tiny'));
// app.use(session({
// 	secret:            process.env.SESSION_SECRET,
// 	resave:            false,
// 	//saveUninitialized: true
// 	saveUninitialized: false
// }));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.static('public'));


/////////////////////ROUTES///////////////////////
app.get('/', function(req,res) {
	res.render('search', {currentPage: 'Search'});
})

// app.use('/auth', require('./routes/auth'));
// app.use('/search', require('./routes/search'));
// app.use('/profile', require('./routes/profile'));

app.use(function(req, res){
    res.status(404).render('404');
});

////////////////////LISTENING/////////////////////
app.listen(process.env.PORT || 3000, function(){
	console.log('Listening...');
});