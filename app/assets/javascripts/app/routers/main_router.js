App.Routers.MainRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "transactions/new": "newTransaction"
  },

  initialize: function () {
    this.contentView = new App.Views.Content()
  },

  index: function () {
    this.contentView.swapMain(new App.Views.DashboardPage());
  },

  newTransaction: function () {
    this.contentView.swapMain(new App.Views.TransactionPage());
  }
});