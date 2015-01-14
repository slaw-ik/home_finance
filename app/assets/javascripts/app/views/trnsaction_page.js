App.Views.TransactionPage = App.Views.Base.extend({
  className: 'container',
  template: HandlebarsTemplates['transaction-page'],


  initialize: function () {
    App.Views.TransactionPage.__super__.initialize.apply(this, arguments);

    this.listenTo(App.Vent, "transaction:create", this.renderForm);

    this.transactions = new App.Views.Transactinos({collection: new App.Collections.Transactions()});
  },

  render: function () {
    App.Views.TransactionPage.__super__.render.apply(this, arguments);
    this.renderForm();
    this.renderTransactions();
    return this;
  },

  renderForm: function () {
    this.model = new App.Models.Transaction();
    var transaction_form = new App.Views.TransactionForm({model: this.model});

    this.$el.find('#new-transaction').html(transaction_form.render().el);
  },

  renderTransactions: function () {
    this.$('#transactions-table table').append(this.transactions.render().el);
  }


});