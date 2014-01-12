var path = require('path');
var express = require('express');
var config = require('./config/config');

var app = express();
if(!config.env.test) app.use(express.logger({format: 'dev', stream: process.stdout}));
app.use(express.static(path.join(__dirname, 'build')));

var routes = require('./app/routes');
routes(app);

app.listen(config.port, function() {
  console.log('listening on ' + config.port);
});
