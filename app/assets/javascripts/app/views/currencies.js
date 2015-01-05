App.Views.Currencies = App.Views.Base.extend({
  template: HandlebarsTemplates['currencies'],

  initialize: function () {
    App.Views.Currencies.__super__.initialize.apply(this, arguments);
    this.listenTo(this.collection, 'reset', this.render);
    this.collection.fetch({reset: true});
  },

  render: function () {
    App.Views.Currencies.__super__.render.apply(this, arguments);
    this.collection.forEach(this.renderCurrency, this);
    return this;
  },

  renderCurrency: function (model) {
    v = new App.Views.Currency({model: model});
    this.$('#transaction_currency_id').append(v.render().el);
  }
});