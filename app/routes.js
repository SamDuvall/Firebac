module.exports = function(app) {
  app.use(function(req, res) { // Single Page Application
    res.sendfile('views/application.html');
  });
}
