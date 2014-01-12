require('./config');

var dataRef = new Firebase("https://rbac.firebaseio.com/organizations");

app = new Marionette.Application();
app.addRegions({
  mainRegion: '#main'
});

Marionette.Renderer.render = function (template, data) {
  return JST[template](data);
};

app.addInitializer(function() {
  // Create the routers
  var controllers = [
    require('./view/organization/controller')
  ];
  controllers.forEach(function (Router) {
    var router = new Router();
  });

  // Start the app
  Backbone.history.start({ pushState: true });
});

$(function () {
  app.start();
});