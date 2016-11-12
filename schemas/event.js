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
	},
	guestList: [{
		id: String,
		username: String,
		img: String
	}],
	eventType: String //can be one of 'open' or 'restricted'
});

module.exports = mongoose.model("delone", eventSchema);