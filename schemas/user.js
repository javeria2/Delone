var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

//setup user schema
var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	about: String,
	img: String,
	followers: [{id: String}],
	following: [{id: String}],
	attendedEvents: [{id: String}]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);