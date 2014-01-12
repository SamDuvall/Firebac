// Override history
Backbone.History = require('./backbone/history');
Backbone.history = new Backbone.History();

// Override router
Backbone.Router = require('./backbone/router');