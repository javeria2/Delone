var express  = require('express'),
	router   = express.Router(),
    User     = require('../schemas/user');

//========= USER ROUTES ===========//
//get user based on id
router.get('/users/:id', function(req, res){
	User.findById(req.params.id, function(err, user){
		if(err) {
			console.log(err);
			return;
		}
		res.json(user);
	})
});

//follow a user, add to appropriate followers and following arrays
router.post('/users/follow/:followingId', function(req, res){
	User.findById(req.params.followingId, function(err, user){
		if(err){
			console.log(err);
			return;
		} 
		user.followers.push({id: req.user._id});
		user.save();
	});

	User.findById(req.user._id, function(err, user){
		if(err){
			console.log(err);
			return;
		}
		user.following.push({id: req.params.followingId});
		user.save();
		res.json({});
	});
});

//add an event to user attended list
router.post('/users/attended/:id', function(req, res){
	User.findById(req.user._id, function(err, user){
		if(err){
			console.log(err);
			return;
		}
		user.attendedEvents.push({id: req.params.id});
		user.save();
		res.json(user);
	});
});
module.exports = router;