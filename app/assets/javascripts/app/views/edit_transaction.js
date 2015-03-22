App.Views.EditTransaction = App.Views.Base.extend({
  tagName: 'tr',
  template: HandlebarsTemplates['edit_transaction'],

  initialize: function () {
    App.Views.EditTransaction.__super__.initialize.apply(this, arguments);

    this.categories = new App.Views.Categories({collection: new App.Collections.Categories({type: this.model.type})});
    this.currencies = new App.Views.Currencies({collection: new App.Collections.Currencies()});

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

    return this;
  }
});