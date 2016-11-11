var express  = require('express'),
	router   = express.Router(),
    User     = require('../schemas/user');

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

module.exports = router;