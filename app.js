var express     = require('express'),
	app         = express(),
	bodyparser  = require('body-parser'),
	mongoose    = require('mongoose');

//connect to mongoose
mongoose.connect("mongodb://localhost/delone");

//include body parser for post requests
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//setup database schema
var eventSchema = new mongoose.Schema({
	event_name: String,
	place: String,
	date: String,
	time: String,
	count: String,
	msg: String,
	img: String
});
var delone = mongoose.model("delone", eventSchema);

//lookup js and css in public directory __dirname refers to current dir
app.use(express.static(__dirname + "/public"));

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

//start up the server
app.listen(process.env.PORT || 3000, function(){
	console.log('listening!');
});

