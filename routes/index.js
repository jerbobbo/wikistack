var express = require('express');
var router = express.Router();

var models = require('../models/');
var Page = models.Page; 
var User = models.User; 

router.get('/', function(req, res, next) {

	Page.find({} )
	.exec()
	.then(function(pages){
		console.log(pages)
		res.render('index', {pages: pages})
	})//some error catching



	// res.render('index', {title: 'Home'});
});

module.exports = router;