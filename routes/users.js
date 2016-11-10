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

module.exports = router;