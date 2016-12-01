var express        = require('express'),
	app            = express(),
	bodyparser     = require('body-parser'),
	mongoose       = require('mongoose'),
	passport       = require('passport'),
	LocalStrategy  = require('passport-local'),
	server         = require('http').createServer(app),
	User           = require('./schemas/user');

//include routes
var eventRoutes    = require('./routes/events'),
    commentRoutes  = require('./routes/comments'),
    authRoutes     = require('./routes/auth');
    usersRoutes    = require('./routes/users');

//include chat sockets
var chat           = require('./chat/chat').listen(server);

//get rid of the mongoose promise error
mongoose.Promise = global.Promise;
//connect mongodb(MLab) to mongoose 
// mongoose.connect("mongodb://localhost/delone");
var db = mongoose.connect("mongodb://sanchay:delone@ds115798.mlab.com:15798/delone");

//include body parser for post requests
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//accept requests to the db
app.use(function(req,res,next){
    req.db = db;
    next();
});

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