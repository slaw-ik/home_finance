App.Views.Categories = App.Views.Base.extend({
  template: HandlebarsTemplates['categories'],

  initialize: function () {
    App.Views.Categories.__super__.initialize.apply(this, arguments);
    this.listenTo(this.collection, 'reset', this.render);
    this.collection.fetch({reset: true});
  },

  render: function () {
    App.Views.Categories.__super__.render.apply(this, arguments);
    this.$('#transaction_category_id').append('<option value="">-- Категорія --</option>');
    this.collection.forEach(this.renderCategory, this);
    return this;
  },

  renderCategory: function (model) {
    v = new App.Views.Category({model: model});
    this.$('#transaction_category_id').append(v.render().el);
  }
});