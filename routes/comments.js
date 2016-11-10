var express  = require('express'),
	router   = express.Router(),
	delone   = require('../schemas/event'),
	comments = require('../schemas/comment');

//========= COMMENT ROUTES ===========//
//create new comment
router.post('/:id/comments', function(req, res){
	delone.findById(req.params.id, function(err, event){
		if(err) {
			console.log(err);
			return;
		}
		comments.create(req.body, function(err, comment){
			if(err){
				console.log(err);
				return;
			}
			//add username and id to the comment
			comment.author.id = req.user._id;
			comment.author.username = req.user.username;
			comment.author.img = req.user.img;
			comment.save();

			//save the comment to the event
			event.comments.push(comment);
			event.save();
			res.json(comment);
		});
	});	
});

module.exports = router;