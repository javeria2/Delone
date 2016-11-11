var mongoose = require('mongoose');

//setup database schema
var eventSchema = new mongoose.Schema({
	event_name: String,
	place: String,
	longitude: Number,
	latitude: Number,
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
	],
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String,
		img: String
	}
});

module.exports = mongoose.model("delone", eventSchema);