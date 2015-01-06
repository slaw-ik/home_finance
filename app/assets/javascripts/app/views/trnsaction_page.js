App.Views.TransactionPage = App.Views.Base.extend({
  className: 'container',
  template: HandlebarsTemplates['transaction-page'],

  events: {
    "click button#add-transaction": "addTransaction"
  },

  initialize: function () {
    App.Views.TransactionPage.__super__.initialize.apply(this, arguments);
  },

  render: function () {
    App.Views.TransactionPage.__super__.render.apply(this, arguments);
    categories = new App.Views.Categories({collection: new App.Collections.Categories()});
    currencies = new App.Views.Currencies({collection: new App.Collections.Currencies()});
    this.$el.find('#categories-group').append(categories.render().el);
    this.$el.find('#currencies-group').append(currencies.render().el);
    transactions = new App.Views.Transactinos({collection: new App.Collections.Transactions()});
    this.$('#transactions-table table').append(transactions.render().el);
    return this;
  },

  addTransaction: function (e) {
    e.preventDefault();
    this.model.set('title', $('#transaction_title').val());
    this.model.set('amount', $('#transaction_amount').val());
    this.model.set('category_id', $('#transaction_category_id').val());
    this.model.set('currency_id', $('#transaction_currency_id').val());
    this.model.save({}, {
        success: function (model) {
          App.Vent.trigger("transaction:create", model)
        }
      }
    );
  }

});