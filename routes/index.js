var express = require('express');
var router = express.Router();

var models = require('../models/');
var Page = models.Page; 
var User = models.User; 

router.get('/', function(req, res, next) {

	Page.find({} )
	.exec()
	.then(function(pages){
		//console.log(pages)
		res.render('index', {pages: pages})
	})//some error catching



	// res.render('index', {title: 'Home'});
});

router.get('/search', function(req, res, next) {


	res.render('search');
});


router.post('/search', function(req, res, next) {

	var searchtags=req.body.searchtags.split(',')
	console.log(searchtags)
	Page.where('tags')
	.in(searchtags)
	.exec()
	.then(function(results){
		res.render('index', {pages: results})
		})
	


	// res.render('search');
});

module.exports = router;