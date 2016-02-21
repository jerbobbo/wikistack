var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); 



// <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

//Schemas

var pageSchema = new Schema({
	title: {type:String, required:true},
	urlTitle: {type:String, required:true},
	content: {type:String, required:true},
	date: {type:Date, default:Date.now},
	status: {type:String, enum:['open','closed']},
	tags: [{type:[String], default:[]}] ,
	author: { ref: 'User', type: mongoose.Schema.ObjectId }
});

pageSchema.virtual('route').get(function(){
	return '/wiki/'+this.urlTitle
})

pageSchema.virtual('authorName').get(function() {
	console.log('virtual name', this.author);
	var x = User.findById(this.author)
	.then(function(name){
		console.log(name.name);
		return name;
	})
	console.log(JSON.stringify(x));
	return x;
})

pageSchema.pre('validate', function(next) {
	var title = this.title;
	console.log('Title:',title);
  	if (title) {
	    // Removes all non-alphanumeric characters from title
	    // And make whitespace underscore
	    this.urlTitle = title.replace(/\s+/g, '_').replace(/\W/g, '');
	  } else {
	    // Generates random 5 letter string
	   this.urlTitle = Math.random().toString(36).substring(2, 7);
	}
	next();
});

// pageSchema.pre('validate', function(next) {
	
// 	console.log('tags:',this.tags);
  	
// 	//this.tags = this.tags.split(',');
// 	//console.log(this.tags);
// 	next();
// });



var userSchema = new Schema({
	name:{type:String, required:true},
	email:{type:String,unique:true,required:true}
});



userSchema.statics.findOrCreate = function(user) {
	//console.log(user);
	var that = this;
	return that.find({ email: user.email })
	.then(function (result) {
		if (result.length)
			return result[0];
		console.log('user does not exist: ', user);
		return that.create({name: user.name, email: user.email});
	});
	
}

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

//End schemas

module.exports = {
  Page: Page,
  User: User
};