var express  = require('express'),
	router   = express.Router(),
	delone   = require('../schemas/event');
	
//========= EVENT ROUTES ===========//
//retrieve a new event
router.get('/', function(req, res){
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
router.post('/', function(req, res){
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
router.get('/:id', function(req, res){
	delone.findById(req.params.id).populate('comments').exec(function(err, event){
		if(err){
			console.log(err);
			return;
		}
		res.json(event);
	});	
});  

module.exports = router;