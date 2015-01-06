App.Models.Transaction = Backbone.Model.extend({
  urlRoot: '/transactions'
});

App.Collections.Transactions = Backbone.Collection.extend({
  model: App.Models.Transaction,
  url: '/transactions'
});