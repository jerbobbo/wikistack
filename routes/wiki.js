var express = require('express');
var router = express.Router();

var models = require('../models/');
var Page = models.Page; 
var User = models.User; 


router.get('/', function(req, res, next) {
	res.render('index', {title: 'Home'});

});

router.get('/add', function(req, res, next) {
	res.render('addpage', {title: 'adder'});
});




router.get('/:urlTitle', function(req, res, next) {
	// db query find page where urltitle=...
	urlTitle=req.params.urlTitle;

	Page.findOne({ 'urlTitle':urlTitle  })
	.exec()
	.then( function(page){
		//console.log(page);
		if (!!page) {
			//console.log(JSON.stringify(page.authorName))
			res.render('wikipage', {page: page});
		}
			
		})
	.catch(function(page){
		res.send('this is blank')// fix error handling
	})

	
	// res.render('wikipage');
});

router.get('/:urlTitle/similar', function(req, res, next) {
	urlTitle=req.params.urlTitle;

	Page.findOne({ 'urlTitle':urlTitle })
	.exec()
	.then( function(page) {
		var tags = page.tags;
		console.log(tags);
		return Page.where('tags').in(tags)
		.where('urlTitle').nin([urlTitle])
	})
	.then(function (results) {
		console.log(results);
		res.render('index', {pages: results});
	})
//.$where(page.urlTitle !== this.urlTitle)

});


router.post('/', function(req, res, next) {
	
	var postBody=req.body

	//console.log(postBody)

	var title = postBody.title;

	User.findOrCreate({name: postBody.author, email:postBody.email})
	.then(function(user) {
		// console.log(user._id.toString());
		var uid=user._id.toString()

		var page = new Page({
	    title: title,
	    content:  postBody.content,
	    status:postBody.status,
	    tags:postBody.tags.split(','),
	    author:uid
	  });
		return page.save()
	})
	.then(function (page) {
		res.redirect('/wiki/'+page.urlTitle)})
	.catch(function(err) {
		res.status(400).send(err);
	});

	//res.redirect('/');
});

router.get('/add', function(req, res, next) {
	res.render('addpage', {title: 'adder'});
});



module.exports = router;