var Organization = Backbone.Model.extend({
  doSomething: function() {
    console.log(this);
  }
});

Organization.Collection = Backbone.Firebase.Collection.extend({
  model: Organization,
  firebase: "https://rbac.firebaseio.com/organizations"
});

module.exports = Organization;