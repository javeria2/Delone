var express        = require('express'),
	app            = express(),
	bodyparser     = require('body-parser'),
	mongoose       = require('mongoose'),
	passport       = require('passport'),
	LocalStrategy  = require('passport-local'),
	server         = require('http').createServer(app),
	delone         = require('./schemas/event'), //include event schema
	comments       = require('./schemas/comment'),
	User           = require('./schemas/user');

//include routes
var eventRoutes    = require('./routes/events'),
    commentRoutes  = require('./routes/comments'),
    authRoutes     = require('./routes/auth');
    usersRoutes     = require('./routes/users');

mongoose.Promise = global.Promise;
//connect to mongoose
mongoose.connect("mongodb://localhost/delone");

//include body parser for post requests
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//lookup js and css in public directory __dirname refers to current dir
app.use(express.static(__dirname + "/client"));

//passport configuration for OAuth
app.use(require('express-session')({
	secret: 'delone is amazing',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//include all the RESTful routes
app.use('/events', eventRoutes);
app.use('/events', commentRoutes);
app.use(usersRoutes);
app.use(authRoutes);

//start up the server
server.listen(process.env.PORT || 8080, function(){
	console.log('listening!');
});