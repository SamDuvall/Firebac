var ViewState = Backbone.Model.extend({
  update: function(attributes) {
    var params = _.extend({}, this.attributes, attributes);
    var query = ViewState.encode(params);
    var url = _.compact([window.location.pathname, query]).join('?');
    Backbone.history.navigate(url);
  },

  reset: function(attributes) {
    var keys = _.union(_.keys(this.attributes), _.keys(attributes));

    var attrs = {};
    _.each(keys, function(key) {
      attrs[key] = attributes[key] || null;
    }, this);

    this.set(attrs);
  }
},{
  encode: function(attributes) {
    return _.compact(_.map(attributes, function(value, key) {
      var valid = _.isNumber(value) || value;
      if (valid) return key + '=' + encodeURIComponent(value);
    })).join('&');
  }
});

module.exports = ViewState;