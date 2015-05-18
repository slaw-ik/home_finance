App.Views.TransactionForm = App.Views.Base.extend({
  template: HandlebarsTemplates['transactions/transaction_form'],

  events: {
    "click button#add-transaction": "addTransaction",
    "keyup input": "clearMyError",
    "change select": "clearMyError"
  },

  initialize: function () {
    App.Views.TransactionForm.__super__.initialize.apply(this, arguments);

    this.categories = new App.Views.Categories({collection: new App.Collections.Categories({type: this.model.type})});
    this.currencies = new App.Views.Currencies({collection: new App.Collections.Currencies()});

    this.listenTo(this.model, 'invalid', this.renderValidationError);
    this.listenTo(App.Vent, "transaction:SavingError", this.renderSavingError);
  },

  render: function () {
    var me = this;
    this.model.set('dateNow', moment(new Date).format('D MMM. YYYY'));

    App.Views.TransactionForm.__super__.render.apply(this, arguments);

    this.$el.find('#categories-group > div').append(this.categories.render().el);
    this.$el.find('#currencies-group > div > div').append(this.currencies.render().el);

    this.$el.find('.transaction_date.input-group.date').datepicker({
      todayBtn: "linked",
      language: "uk",
      autoclose: true,
      todayHighlight: true,
      format: 'd M. yyyy'
    }).on('changeDate', function (e) {
      me.clearMyError({target: this})
    });

    return this;
  },

  renderValidationError: function (model) {
    var me = this;
    _.each(_.keys(model.validationError), function (key) {
      var cross = (key == 'date') ? '' : '<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>'
      me.$('input#transaction_' + key)
        .attr('aria-describedby', 'inputError2' + key)
        .after(cross)
        .after('<span id="inputError2Status" class="sr-only">(error)</span>')
        .closest('.form-group')
        .addClass('has-error has-feedback');

      me.$('select#transaction_' + key)
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
      date: moment($('#transaction_date').val(), 'D MMM. YYYY').format('DD/MM/YYYY'),
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