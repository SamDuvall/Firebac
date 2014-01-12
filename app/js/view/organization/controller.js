var Organization = require('../../model/organization');

var controller = {
  organization: function(id) {
    var model = new Organization({id: id});
    var View = require('./show');
    var view = new View({
      model: model
    });
    app.mainRegion.show(view);
  }
};

var Router = Marionette.AppRouter.extend({
  controller: controller,
  appRoutes: {
    'organizations/:id': 'organization'
  }
});

module.exports = Router;
