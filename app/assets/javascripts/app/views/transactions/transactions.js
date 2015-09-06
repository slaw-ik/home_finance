App.Views.Transactinos = App.Views.Base.extend({
  tagName: "tbody",

  initialize: function () {
    App.Views.Transactinos.__super__.initialize.apply(this, arguments);
    this.listenTo(this.collection, 'reset', this.render);
    this.collection.fetch({reset: true});
    this.listenTo(App.Vent, "transaction:create", this.renderTransaction);
    //this.listenTo(this.collection, "add", this.renderProject);
  },

  render: function () {
    App.Views.Transactinos.__super__.render.apply(this, arguments);
    this.collection.forEach(this.renderTransaction, this);
    return this;
  },

  renderTransaction: function (model) {
    v = new App.Views.Transaction({model: model});
    if (model.isValid()) {
      this.$el.append(v.render().el);
    }
  }
});