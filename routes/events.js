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

//get delone belonging to specific user with userId = id
router.get('/users/:id', function(req, res){
	delone.find({"author.id":req.params.id}, function(err, event){
		if(err){
			console.log(err);
			return;
		}
		res.json(event);
	});
});

router.post('/guests/:id', function(req, res){
	delone.findById(req.params.id, function(err, event){
		if(err){
			console.log(err);
			return;
		}
		var guest = {id: req.user._id, username: req.user.username, img: req.user.img};
		event.guestList.push(guest);
		event.save();
		res.json(guest);
	});
});
module.exports = router;