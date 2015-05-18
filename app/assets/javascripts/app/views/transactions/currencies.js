App.Views.Currencies = App.Views.Base.extend({
  template: HandlebarsTemplates['transactions/currencies'],

  initialize: function (attrs) {
    this.attrs = attrs;
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
    if (model.get('id') == this.attrs.changed_id) {
      model.set('selected', 'selected')
    }

    v = new App.Views.Currency({model: model});
    this.$('#transaction_currency_id').append(v.render().el);
  }
});