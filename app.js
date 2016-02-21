var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');
require('./filters')(swig);
var methodOverride = require('method-override');
var path = require('path');

swig.setDefaults({cache: false});

app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/vendor', express.static( path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', require('./routes'));
app.use('/wiki', require ('./routes/wiki.js'));


module.exports = app;