var ItemView = Backbone.Marionette.ItemView.extend({
  tagName: 'li',
  className: 'member',
  template: 'organization/member/entry',

  events: {
    'click .remove-member': 'removeMember'
  },

  removeMember: function() {
    this.model.collection.remove(this.model);
  }
});

var CollectionView = Backbone.Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'members',
  itemView: ItemView
});

module.exports = CollectionView;