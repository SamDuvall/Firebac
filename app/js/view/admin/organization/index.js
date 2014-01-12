var Organization = require('../../../model/organization');

var ItemView = Backbone.Marionette.ItemView.extend({
  tagName: 'li',
  className: 'organization',
  template: 'admin/organization/entry',

  events: {
    'click .remove-organization': 'removeOrganization'
  },

  removeOrganization: function() {
    this.model.collection.remove(this.model);
  }
});

var CollectionView = Backbone.Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'organizations',
  itemView: ItemView
});

var View = Backbone.Marionette.View.extend({
  tagName: 'article',
  className: 'organizations',
  template: 'admin/organization/index',

  events: {
    'click .add-organization': 'addOrganization'
  },

  initialize: function() {
    this.organizations = new Organization.Collection();
  },

  render: function() {
    this.$el.html(JST[this.template]());

    var organizations = new CollectionView({
      el: this.$el.find('ul.organizations'),
      collection: this.organizations
    });
    organizations.render();

    return this;
  },

  addOrganization: function() {
    this.organizations.create({
      id: 'new-organization'
    })
  }
});

module.exports = View;