var express = require('express'),
	app = express(),
	bodyparser = require('body-parser');

//set ejs as the view engine
app.set('view engine', 'ejs');

//include body parser for post requests
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//lookup js and css in public directory __dirname refers to current dir
app.use(express.static(__dirname + "/public"));


app.get('/events', function(req, res){
	var events = [{
		"name": "Sanchay",
		"food": "Indian"
	}];
	res.json(events);
});

//start up the server
app.listen(process.env.PORT || 3000, function(){
	console.log('listening!');
});

