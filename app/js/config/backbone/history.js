var ViewState = require('./view-state');
var parseUrl = require('url').parse;

function cleanPath(path) {
  return _.filter(path.split('/'), function(part) {
    return part.length;
  }).join('/');
}

var History = function() {
  this.handlers = [];
  _.bindAll(this, 'onPopState');

  // Ensure that `History` can be used outside of the browser.
  if (typeof window !== 'undefined') {
    this.location = window.location;
    this.history = window.history;
  }
};

// Has the history handling already been started?
History.started = false;

// Set up all inheritable **Backbone.History** properties and methods.
_.extend(History.prototype, Backbone.Events, {

  start: function() {
    if (History.started) throw new Error("History has already been started");
    History.started = true;

    this._hasPushState = !!(this.history && this.history.pushState);
    if (this._hasPushState) {
      Backbone.$(window).on('popstate', this.onPopState);      
    }

    this.loadUrl();
  },

  stop: function() {
    if (this._hasPushState) {
      Backbone.$(window).off('popstate', this.onPopState);
    }

    History.started = false;
  },

  route: function(route, callback) {
    this.handlers.unshift({route: route, callback: callback});
  },

  onPopState: function() {
    this.loadUrl();
  },

  loadUrl: function(url) {
    var prevUrl = this.url || {};
    this.url = parseUrl(url || window.location.href, true);
    if (this.url.pathname == prevUrl.pathname) {
      this.viewState.reset(this.url.query);
      return true;
    } else {
      var path = cleanPath(this.url.pathname);
      var viewState = this.viewState = new ViewState(this.url.query);
      
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(path)) {
          handler.callback(path, viewState);
          return true;
        }
      });
    }

  },

  navigate: function(url) {
    if (!History.started) return false;

    if (this._hasPushState) {
      this.history.pushState({}, document.title, url);
      this.loadUrl(url);
    } else {
      return this.location.assign(url);
    }
  }
});

module.exports = History;
