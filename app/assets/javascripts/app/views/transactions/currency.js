App.Views.Currency = App.Views.Base.extend({
  template: JST['transactions/currency'],

  render: function () {
    App.Views.Currency.__super__.render.apply(this, arguments);
    this.setElement(this.$('option'));
    return this;
  }
});