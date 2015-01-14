App.Views.TransactionForm = App.Views.Base.extend({
  template: HandlebarsTemplates['transaction_form'],

  events: {
    "click button#add-transaction": "addTransaction",
    "keyup input": "clearMyError",
    "change select": "clearMyError"
  },

  initialize: function () {
    App.Views.TransactionForm.__super__.initialize.apply(this, arguments);

    this.categories = new App.Views.Categories({collection: new App.Collections.Categories()});
    this.currencies = new App.Views.Currencies({collection: new App.Collections.Currencies()});

    this.listenTo(this.model, 'invalid', this.renderValidationError);
    this.listenTo(App.Vent, "transaction:SavingError", this.renderSavingError);
  },

  render: function () {
    App.Views.TransactionForm.__super__.render.apply(this, arguments);

    this.$el.find('#categories-group').append(this.categories.render().el);
    this.$el.find('#currencies-group').append(this.currencies.render().el);
    return this;
  },

  renderValidationError: function (model) {
    _.each(_.keys(model.validationError), function (key) {
      $('input#transaction_' + key)
        .attr('aria-describedby', 'inputError2' + key)
        .after('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span><span id="inputError2Status" class="sr-only">(error)</span>')
        .closest('.form-group')
        .addClass('has-error has-feedback');

      $('select#transaction_' + key)
        .closest('.form-group')
        .addClass('has-error');
    })
  },

  renderSavingError: function (model) {
    console.log('renderSavingError -> ', model);
  },

  cleanErrors: function () {
    $('span.glyphicon.glyphicon-remove.form-control-feedback, span.sr-only').remove();
    $('.has-error').removeClass('has-error');
    $('.has-feedback').removeClass('has-feedback');
  },

  clearMyError: function (event) {
    $(event.target).closest('.form-group')
      .removeClass('has-error')
      .removeClass('has-feedback')
      .find('span.glyphicon.glyphicon-remove.form-control-feedback, span.sr-only')
      .remove()
  },

  addTransaction: function (e) {
    e.preventDefault();
    this.cleanErrors();
    this.model.set({
      title: $('#transaction_title').val(),
      amount: $('#transaction_amount').val(),
      category_id: $('#transaction_category_id').val(),
      currency_id: $('#transaction_currency_id').val()
    });
    this.model.save({}, {
        success: function (model) {
          App.Vent.trigger("transaction:create", model)
        },
        error: function (model) {
          App.Vent.trigger("transaction:SavingError", model)
        }
      }
    )
  }

});