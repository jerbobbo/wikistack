var http = require('http');
var chalk = require('chalk');
var server = http.createServer(require('./app'));

var port = process.env.PORT || 3000;

server.listen(port, function() {
    console.log(chalk.green(`server has started on port ${port}`));
});