var assert   = require('chai').assert,
	mocha    = require('mocha'),
	mongoose = require('mongoose');

//connect to mongoose
mongoose.connect("mongodb://localhost/delone");

//setup database schema
var eventSchema = new mongoose.Schema({
	event_name: String,
	place: String,
	date: String,
	time: String,
	count: String,
	msg: String,
	img: String
});
var delone = mongoose.model("delone", eventSchema, "delones");

//test storing and retrieving of database entry
describe('events', function(){
	this.timeout(140000);
	it('should be stored correctly', function(done){
		this.timeout(140000);
		setTimeout(function(){
			done();
		}, 140000);
		var new_event = {
	      	event_name : 'Italian feast!',
            place : 'Papa Johns, Champaign',
            date : '4th November, 2016',
            time : '8 PM',
            count : '2',
            msg : 'Let\'s get fat together',
            img : 'https://cdn1.tnwcdn.com/wp-content/blogs.dir/1/files/2012/10/Food.jpg'
    	};

    	delone.create(new_event, function(err, success){
			if(err){
				return done(err);
			}
			delone.find({'event_name':'Italian feast!'}, function(err, events){
				if(err){
					return done(err);
				}
				assert.equal(events[0].msg, 'Let\'s get fat together');
				assert.equal(events[0].date, '4th November, 2016');
				done();
			});
		});
	});
});