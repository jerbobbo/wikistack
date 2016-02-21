var express = require('express');
var router = express.Router();

var models = require('../models/');
var Page = models.Page; 
var User = models.User; 


router.get('/', function(req, res, next) {
	res.render('index', {title: 'Home'});

});


router.get('/:urlTitle', function(req, res, next) {
	// db query find page where urltitle=...
	urlTitle=req.params.urlTitle;

	Page.findOne({ 'urlTitle':urlTitle  })
	.exec()
	.then( function(page){
		console.log(page);
		if (!!page)
			res.render('wikipage', page);
		})
	.catch(function(page){
		res.send('this is blank')// fix error handling
	})

	
	// res.render('wikipage');
});


router.post('/', function(req, res, next) {
	
	var postBody=req.body

	console.log(postBody)

	var title = postBody.title;

	var page = new Page({
    title: title,
    content:  postBody.content,
    status:postBody.status
    // author:
  });

	page.save()
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