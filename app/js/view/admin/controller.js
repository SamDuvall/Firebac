var controller = {
  index: function() {
    var View = require('./index');
    var view = new View();
    app.mainRegion.show(view);
  },

  organizations: function() {
    var View = require('./organization/index');
    var view = new View();
    app.mainRegion.show(view);
  }
};

var Router = Marionette.AppRouter.extend({
  controller: controller,
  appRoutes: {
    '': 'index',
    'organizations': 'organizations'
  }
});

module.exports = Router;
