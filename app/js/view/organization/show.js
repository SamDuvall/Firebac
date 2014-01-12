var View = Backbone.Marionette.ItemView.extend({
  tagName: 'article',
  className: 'organization',
  template: 'organization/show',

  events: {
    'click .add-member': 'addMember'
  },

  onRender: function() {
    var View = require('./member/index');
    var members = new View({
      el: this.$el.find('ul.members'),
      collection: this.model.members
    });
    members.render();
  },

  addMember: function() {
    this.model.members.create({
      email: 'email@test.com'
    })
  }
});

module.exports = View;