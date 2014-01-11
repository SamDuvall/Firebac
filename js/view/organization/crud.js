var Organization = require('../../model/organization');

var MemberView = Backbone.Marionette.CollectionView.extend({
  tagName: 'li',
  className: 'member',

  events: {
    'click .remove-member': 'removeMember'
  },

  render: function() {
    this.$el.html(this.model.id);
    this.$el.append('<button type="button" class="remove-member">x</member>');
    return this;
  },

  removeMember: function() {
    this.model.destroy();
  }
});

var MembersView = Backbone.Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'members',
  itemView: MemberView
});

var ItemView = Backbone.Marionette.CollectionView.extend({
  tagName: 'li',
  className: 'organization',

  events: {
    'click .remove-organization': 'removeOrganization',
    'click .add-member': 'addMember'
  },

  render: function() {
    this.$el.html(this.model.id);
    this.$el.append('<button type="button" class="remove-organization">x</member>');

    var list = new MembersView({
      collection: this.model.members
    });
    this.$el.append(list.render().el);

    this.$el.append('<button type="button" class="add-member">Add Member</member>');
    return this;
  },

  removeOrganization: function() {
    this.model.destroy();
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
  itemView: ItemView,
  initialize: function() {
    this.collection = new Organization.Collection();
  }
});

module.exports = CollectionView;