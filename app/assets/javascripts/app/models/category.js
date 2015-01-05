App.Models.Category = Backbone.Model.extend({
  rootUrl: '/categories',
  defaults: {
    "id": 0,
    "user_id": 0,
    "name": "",
    "created_at": "",
    "updated_at": ""
  }
});

App.Collections.Categories = Backbone.Collection.extend({
  model: App.Models.Category,
  url: '/categories'
});