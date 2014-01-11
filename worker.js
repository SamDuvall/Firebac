var path = require('path');
var express = require('express');
var config = require('./config/config');

var app = express();
if(!config.env.test) app.use(express.logger({format: 'dev', stream: process.stdout}));
app.use('/css', express.static(path.join(__dirname, 'css/build')));
app.use('/js', express.static(path.join(__dirname, 'js/build')));

var consolidate = require('consolidate');
app.engine('html', consolidate.underscore);
app.engine('txt', consolidate.underscore);
app.set('view engine', 'html');

var routes = require('./app/routes');
routes(app);

app.listen(config.port, function() {
  console.log('listening on ' + config.port);
});
