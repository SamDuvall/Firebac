var View = Marionette.View;
Marionette.View = View.extend({
  constructor: function(){
    var args = Array.prototype.slice.apply(arguments);
    View.prototype.constructor.apply(this, args);

    // Clean up bindings when removed
    var view = this;
    this.$el.on('remove', function() {
      view.stopListening();
      view.unstickit();
      Marionette.triggerMethod.call(view, 'remove');
    });
  },
});

var ItemView = Marionette.ItemView;
Marionette.ItemView = ItemView.extend({
  bindUIElements: function() {
    ItemView.prototype.bindUIElements.call(this);
    this.stickit();
  }
});

var CollectionView = Marionette.CollectionView;
Marionette.CollectionView = CollectionView.extend({
  appendHtml: function(collectionView, itemView, index) {
    if(index == 0) {
      this.$el.prepend(itemView.el);     
    } else {
      this.$el.find('>:nth-child(' + index + ")").after(itemView.el)
    }
  }
});

var CompositeView = Marionette.CompositeView;
Marionette.CompositeView = CompositeView.extend({
  appendHtml: function(collectionView, itemView, index) {
    var $container = this.getItemViewContainer(collectionView);
    if(index == 0) {
      $container.prepend(itemView.el);     
    } else {
      $container.find('>:nth-child(' + index + ")").after(itemView.el)
    }
  }
});