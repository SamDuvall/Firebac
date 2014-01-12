var Organization = require('../../model/organization');

var controller = {
  index: function() {
    var View = require('./index');
    var view = new View();
    app.mainRegion.show(view);
  }
};

var Router = Marionette.AppRouter.extend({
  controller: controller,
  appRoutes: {
    '': 'index',
    'organizations': 'index'
  }
});

module.exports = Router;
