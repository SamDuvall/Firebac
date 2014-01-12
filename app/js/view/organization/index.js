var Organization = require('../../model/organization');

var MemberView = Backbone.Marionette.ItemView.extend({
  tagName: 'li',
  className: 'member',
  template: 'organization/member',

  events: {
    'click .remove-member': 'removeMember'
  },

  removeMember: function() {
    this.model.collection.remove(this.model);
  }
});

var MembersView = Backbone.Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'members',
  itemView: MemberView
});

var ItemView = Backbone.Marionette.ItemView.extend({
  tagName: 'li',
  className: 'organization',
  template: 'organization/entry',

  events: {
    'click .remove-organization': 'removeOrganization',
    'click .add-member': 'addMember'
  },

  onRender: function() {
    var members = new MembersView({
      el: this.$el.find('ul.members'),
      collection: this.model.members
    });
    members.render();
  },

  removeOrganization: function() {
    this.model.collection.remove(this.model);
  },

  addMember: function() {
    this.model.members.create({
      email: 'email@test.com'
    })
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
  template: 'organization/index',

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