var Member = Backbone.Model.extend({
  doSomething: function() {
    console.log(this);
  }
});

Member.Collection = Backbone.Firebase.Collection.extend({
  model: Member
});

var Organization = Backbone.Model.extend({
  doSomething: function() {
    console.log(this);
  }
},{
  Member: Member
});

Object.defineProperty(Organization.prototype, 'members', {
  enumerable: true,
  get: function() {
    if (this._members) return this._members;
    this._members = new Member.Collection(null, {
      firebase: "https://rbac.firebaseio.com/organizations/" + this.id + "/members" 
    });
    return this._members;
  }
});

Organization.Collection = Backbone.Firebase.Collection.extend({
  model: Organization,
  firebase: "https://rbac.firebaseio.com/organizations"
});

module.exports = Organization;