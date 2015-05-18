App.Views.EditTransaction = App.Views.Base.extend({
  tagName: 'tr',
  template: HandlebarsTemplates['transactions/edit_transaction'],
  events: {
    'click #edit-transaction': 'editTransaction',
    'click .cancel-transaction': 'cancelTransaction'
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

    this.listenTo(App.Vent, "transaction:edit:done", this.replaceTransaction);
    this.listenTo(App.Vent, "transaction:edit:cancel", this.replaceTransaction);

    this.listenTo(this.model, 'invalid', this.renderEditValidationError);

    //$(document).on('keyup', _.bind(this.onKeyup, this));
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
    var me = this;
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
          me.old_model = model;
          App.Vent.trigger("transaction:edit:done", model)
        },
        error: function (model) {
          //App.Vent.trigger("transaction:SavingError", model)
        }
      }
    )
  },

  cancelTransaction: function (e) {
    e.preventDefault();
    App.Vent.trigger("transaction:edit:cancel");
    //this.off();
    //this.remove();
  },

  onKeyup: function (e) {
    if (e.keyCode == 27) {
      this.cancelTransaction(e);
    }
  },

  remove: function () {
    $(document).off('keyup');
    Backbone.View.prototype.remove.call(this);
  },

  replaceTransaction: function () {
    var newElement = new App.Views.Transaction({model: this.old_model}).render().el,
      $prev = this.$el.prev(),
      $parent = this.$el.parent();

    if ($prev.length > 0) {
      $prev.after(newElement);
    } else {
      $parent.prepend(newElement);
    }

    this.off();
    this.remove();
  },

  renderEditValidationError: function (model) {
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


});