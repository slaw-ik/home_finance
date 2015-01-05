App.Views.TransactionPage = App.Views.Base.extend({
  className: 'container',
  template: HandlebarsTemplates['transaction-page'],

  initialize: function () {
    App.Views.TransactionPage.__super__.initialize.apply(this, arguments);
  },

  render: function () {
    App.Views.TransactionPage.__super__.render.apply(this, arguments);
    categories = new App.Views.Categories({collection: new App.Collections.Categories()});
    currencies = new App.Views.Currencies({collection: new App.Collections.Currencies()});
    this.$el.find('#categories-group').append(categories.render().el);
    this.$el.find('#currencies-group').append(currencies.render().el);
    return this;
  }

});