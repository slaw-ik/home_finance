App.Models.Currency = Backbone.Model.extend({
  rootUrl: '/currencies'
});

App.Collections.Currencies = Backbone.Collection.extend({
  model: App.Models.Currency,
  url: '/currencies'
});