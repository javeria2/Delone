var mongoose = require('mongoose');
//setup database schema
var eventSchema = new mongoose.Schema({
	event_name: String,
	place: String,
	date: String,
	time: String,
	count: String,
	msg: String,
	img: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "comment"
		}
	]
});

module.exports = mongoose.model("delone", eventSchema);