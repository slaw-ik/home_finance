App.Views.Base = Backbone.View.extend({

  initialize: function (config) {
    _.extend(this, config);
    this.model = {};
    if (config) {
      _.extend(this.model, config.model);
    }
    this.template = this.template || _.template("");
    App.Views.Base.__super__.initialize.apply(this, arguments);
  },

  hide: function () {
    this.$el.hide();
  },

  show: function () {
    this.$el.show();
  },

  render: function () {
    var model = this.model.toJSON && this.model.toJSON() || this.model;
    this.$el.html(this.template(model));
    return this;
  },

  renderNested: function( view, selector ) {
    var $element = ( selector instanceof $ ) ? selector : this.$( selector );
    view.setElement( $element ).render();
  }
});