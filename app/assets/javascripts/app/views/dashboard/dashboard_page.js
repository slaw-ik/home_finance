App.Views.DashboardPage = App.Views.Base.extend({
  className: 'container',
  template: HandlebarsTemplates['dashboard/dashboard_page'],

  initialize: function () {
    App.Views.TransactionPage.__super__.initialize.apply(this, arguments);
  },

  render: function () {
    App.Views.DashboardPage.__super__.render.apply(this, arguments);

    //this.model = new App.Models.Transaction({type: params.type});
    var chart = new App.Views.Chart();

    this.$el.find('#chart_section').html(chart.render().el);

    return this;
  }
});