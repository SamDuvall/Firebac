var View = Backbone.Marionette.View.extend({
  tagName: 'article',
  className: 'admin',
  template: 'admin/index',

  render: function() {
    this.$el.html(JST[this.template]());
    return this;
  }
});

module.exports = View;