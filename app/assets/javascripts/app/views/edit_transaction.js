App.Views.EditTransaction = App.Views.Base.extend({
  tagName: 'tr',
  template: HandlebarsTemplates['edit_transaction'],
  events: {
    'click #edit-transaction': 'editTransaction',
    'click .delete-transaction': 'deleteTransaction'
  },

  initialize: function () {
    App.Views.EditTransaction.__super__.initialize.apply(this, arguments);

    this.categories = new App.Views.Categories({
      changed_id: this.model.get('category_id'),
      collection: new App.Collections.Categories({type: this.model.type})
    });
    this.currencies = new App.Views.Currencies({
      changed_id: this.model.get('currency_id'),
      collection: new App.Collections.Currencies()
    });

  },

  render: function () {
    App.Views.EditTransaction.__super__.render.apply(this, arguments);

    this.$el.find('.transaction_date.input-group.date').datepicker({
      todayBtn: "linked",
      language: "uk",
      autoclose: true,
      todayHighlight: true,
      format: 'd M. yyyy'
    });

    this.$el.find('#edit-categories-group').append(this.categories.render().el);
    this.$el.find('#edit-currencies-group').append(this.currencies.render().el);

    return this;
  },

  editTransaction: function (e) {
    e.preventDefault();
    //this.cleanErrors();
    this.model.set({
      date: moment(this.$el.find('#transaction_date').val(), 'D MMM. YYYY').format('DD/MM/YYYY'),
      title: this.$el.find('#transaction_title').val(),
      amount: this.$el.find('#transaction_amount').val(),
      category_id: this.$el.find('#transaction_category_id').val(),
      currency_id: this.$el.find('#transaction_currency_id').val()
    });
    this.model.save({}, {
        success: function (model) {
          //App.Vent.trigger("transaction:create", model)
        },
        error: function (model) {
          //App.Vent.trigger("transaction:SavingError", model)
        }
      }
    )
  }
});