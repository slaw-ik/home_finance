App.Models.Currency = Backbone.Model.extend({
  rootUrl: '/currencies'
});

App.Collections.Currencies = Backbone.Collection.extend({
  url: '/currencies'
});