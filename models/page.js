var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pageSchema = new Schema({
	title: String,
	urlTitle: String,
	content: [{ body: String }],
	date: Date,
	status: Boolean,
	author: { ref: 'User', type: mongoose.Schema.ObjectId }
});

var Page = mongoose.model('Page', pageSchema);

module.exports = Page;