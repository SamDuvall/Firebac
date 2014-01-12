var dataRef = new Firebase("https://rbac.firebaseio.com/organizations");

app = new Marionette.Application();
app.addRegions({
  mainRegion: '#main'
});

app.addInitializer(function() {
  var View = require('./view/organization/crud');
  var view = new View();
  app.mainRegion.show(view);
});

$(function () {
  app.start();
});