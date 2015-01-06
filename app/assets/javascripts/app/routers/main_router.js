App.Routers.MainRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "transactions/new": "newTransaction"
  },

  initialize: function () {
    this.contentView = new App.Views.Content()
  },

  index: function () {
    console.log("Root Path");
  },

  newTransaction: function () {
    this.contentView.swapMain(new App.Views.TransactionPage({
      model: new App.Models.Transaction()
    }));
  }
});