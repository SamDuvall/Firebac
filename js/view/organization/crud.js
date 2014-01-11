var Organization = require('../../model/organization');

var ItemView = Backbone.Marionette.CollectionView.extend({
  tagName: 'li',
  className: 'organization',
  render: function() {
    this.$el.html(this.model.get('id'));
    return this;
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