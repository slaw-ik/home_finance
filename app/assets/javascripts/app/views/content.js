App.Views.Content = App.Views.Base.extend({

  initialize: function () {
    App.Views.Content.__super__.initialize.apply(this, arguments);
  },

  swapMain: function (v) {
    this.changeCurrentMainView(v);
    $('#main-area').html(this.currentMainView.render().el)
  },

  changeCurrentMainView: function (v) {
    if (this.currentMainView) {
      this.currentMainView.remove()
    }
    this.currentMainView = v
  }
});