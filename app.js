var express       = require('express'),
	app           = express(),
	bodyparser    = require('body-parser'),
	mongoose      = require('mongoose'),
	passport      = require('passport'),
	LocalStrategy = require('passport-local'),
	delone        = require('./schemas/event'), //include event schema
	comments      = require('./schemas/comment'),
	User          = require('./schemas/user');

mongoose.Promise = global.Promise;
//connect to mongoose
mongoose.connect("mongodb://localhost/delone");

//include body parser for post requests
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//lookup js and css in public directory __dirname refers to current dir
app.use(express.static(__dirname + "/client"));

//passport configuration
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

//========= EVENT ROUTES ===========//
//retrieve a new event
app.get('/events', function(req, res){
	//get all events from db
	delone.find({}, function(err, events){
		if(err){
			console.log(err);
			return;
		}
		res.json(events);
	});
});

//post a new event
app.post('/events', function(req, res){
	//save new event to db	
	delone.create(req.body, function(err, success){
		if(err){
			console.log(err);
			return;
		}
		res.json(success);
	});
});

//event description
app.get('/events/:id', function(req, res){
	delone.findById(req.params.id).populate('comments').exec(function(err, event){
		if(err){
			console.log(err);
			return;
		}
		res.json(event);
	});	
});  

//========= COMMENT ROUTES ===========//
//create new comment
app.post('/events/:id/comments', function(req, res){
	delone.findById(req.params.id, function(err, event){
		if(err) {
			console.log(err);
			return;
		}
		console.log(req.body);
		comments.create(req.body, function(err, comment){
			if(err){
				console.log(err);
				return;
			}
			event.comments.push(comment);
			event.save();
			res.json(comment);
		});
	});	
});

//========= USER AUTH ===========//
//signin
app.post('/signup', function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return;
		}
		passport.authenticate('local')(req, res, function(){
			res.json(user);
		});
	});
});

//login
app.post('/login', function(req, res){
	passport.authenticate('local', function(err, user, info) {
    	if (err) { 
    		console.log(err);
    		return;
    	}
    	req.logIn(user, function(err) {
      		if (err) { 
    			console.log(err);
    			return;
    		}
    		res.json(user);
    	});
    })(req, res);
});

//logout
app.get('/logout', function(req, res){
	req.logout();
	res.json({});
});

//check if user is authenticated
app.get('/isLoggedIn', function(req, res){
	res.send(req.isAuthenticated() ? req.user : '0');
});



//start up the server
app.listen(process.env.PORT || 3000, function(){
	console.log('listening!');
});

