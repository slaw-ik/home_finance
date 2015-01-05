App.Views.Category = App.Views.Base.extend({
  template: HandlebarsTemplates['category'],

  render: function () {
    App.Views.Category.__super__.render.apply(this, arguments);
    this.setElement(this.$('option'));
    return this;
  }

});