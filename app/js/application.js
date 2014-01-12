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
    require('./view/admin/controller'),
    require('./view/organization/controller')
  ];
  controllers.forEach(function (Router) {
    var router = new Router();
  });

  // Start the app
  Backbone.history.start({ pushState: true });
});

$(function () {
  $.ajaxSetup({
    cache: false, // Don't cache requests
    dataType: 'json'
  });

  // If this is a modified click allow the browser-default behavior to take over
  var updatePushState = function (event) {
    if (event.metaKey) return;
    var href = $(this).attr('href');
    if (href && href[0] == '/') {
      Backbone.history.navigate(href);
      return false;
    }
  }
  $(document).on("click", "a:not([data-history=false],[target=_blank])", updatePushState);

  app.start();
});