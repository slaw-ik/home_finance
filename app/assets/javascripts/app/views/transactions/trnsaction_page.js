App.Views.TransactionPage = App.Views.Base.extend({
  className: 'container',
  template: HandlebarsTemplates['transactions/transaction-page'],

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
    //var type = ((typeof aa != 'undefined') && model.type) ? model.type : 'debet';
    var type = 'debet';
    this.renderForm({type: type});
    this.renderTransactions({type: type});
    new Tablesort(this.$el.find('#transactions-table table')[0]);
    return this;
  },

  renderDebetView: function (e) {
    e.preventDefault();
    var tab = $(e.currentTarget),
      type = 'debet';
    this.renderView(tab, type);
  },

  renderCreditView: function (e) {
    e.preventDefault();
    var tab = $(e.currentTarget),
      type = 'credit';
    this.renderView(tab, type);
  },

  activateTab: function (tab) {
    tab.siblings().removeClass('active');
    tab.addClass('active');
  },

  renderView: function (tab, type, params) {
    if (tab.attr('class') !== 'active') {
      this.activateTab(tab);
      this.renderForm(_.extend({type: type}, params));
      this.renderTransactions({type: type});
    }
  },

  renderForm: function (params) {
    var form_header = params.form_header || '';
    this.model = new App.Models.Transaction({type: params.type});

    if (!form_header) {
      if (params.type == 'debet') {
        form_header = 'Додати розхід'
      } else {
        form_header = 'Додати дохід'
      }
    }

    this.model.set('form_header', form_header);
    var transaction_form = new App.Views.TransactionForm({model: this.model});

    this.$el.find('#new-transaction').html(transaction_form.render().el);
  },

  renderTransactions: function (params) {
    var transactions = new App.Views.Transactinos({collection: new App.Collections.Transactions({type: params.type})});
    this.$('#transactions-table table tbody').replaceWith(transactions.render().el);
  }

});