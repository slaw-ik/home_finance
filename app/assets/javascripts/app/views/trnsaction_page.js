App.Views.TransactionPage = App.Views.Base.extend({
  className: 'container',
  template: HandlebarsTemplates['transaction-page'],

  events: {
    'click #debet-tab': 'renderDebetView',
    'click #credit-tab': 'renderCreditView'
  },

  initialize: function () {
    App.Views.TransactionPage.__super__.initialize.apply(this, arguments);

    this.listenTo(App.Vent, "transaction:create", this.renderForm);
  },

  render: function () {
    App.Views.TransactionPage.__super__.render.apply(this, arguments);
    this.renderForm();
    //this.renderTransactions();
    this.renderDebetTransactions();
    return this;
  },

  renderForm: function (model) {
    if (model && model.params.credit && model.params.credit == true) {
      this.renderCreditForm();
    } else {
      this.renderDebetForm();
    }
  },

  renderDebetView: function (e) {
    e.preventDefault();
    var tab = $(e.currentTarget);
    if (tab.attr('class') !== 'active') {
      this.activateTab(tab);
      this.renderDebetForm();
      this.renderDebetTransactions();
    }
  },

  renderCreditView: function (e) {
    e.preventDefault();
    var tab = $(e.currentTarget);
    if (tab.attr('class') !== 'active') {
      this.activateTab(tab);
      this.renderCreditForm();
      this.renderCreditTransactions();
    }
  },

  activateTab: function (tab) {
    tab.siblings().removeClass('active');
    tab.addClass('active');
  },

  renderDebetForm: function () {
    this.model = new App.Models.Transaction({debet: true});
    var transaction_form = new App.Views.TransactionForm({model: this.model});

    this.$el.find('#new-transaction').html(transaction_form.render().el);
  },

  renderCreditForm: function () {
    this.model = new App.Models.Transaction({credit: true});
    var transaction_form = new App.Views.TransactionForm({model: this.model});

    this.$el.find('#new-transaction').html(transaction_form.render().el);
  },

  renderTransactions: function () {
    if (model.params.debet || model.params.credit) {
      if (model.params.debet && model.params.debet == true) {
        this.renderDebetTransactions();
      }

      if (model.params.credit && model.params.credit == true) {
        this.renderCreditTransactions()
      }
    } else {

    }
  },

  renderCreditTransactions: function () {
    var creditTransactions = new App.Views.Transactinos({collection: new App.Collections.CreditTransactions()});
    this.$('#transactions-table table').append(creditTransactions.render().el);
  },

  renderDebetTransactions: function () {
    var debetTransactions = new App.Views.Transactinos({collection: new App.Collections.DebetTransactions()});
    this.$('#transactions-table table').append(debetTransactions.render().el);
  }


});