App.Views.DashboardPage = App.Views.Base.extend({
  className: 'container',
  template: HandlebarsTemplates['dashboard/dashboard_page'],

  initialize: function () {
    App.Views.TransactionPage.__super__.initialize.apply(this, arguments);
  },

  render: function () {
    var me = this;
    App.Views.DashboardPage.__super__.render.apply(this, arguments);

    var charts = [
//      new App.Views.CircleDebetChart(),
//      new App.Views.LineTendencyChart(),
//      new App.Views.BarChart(),
      new App.Views.BucketStateChart()
    ];

    _.each(charts, function (chart) {
      me.$el.find('#chart_section').append(chart.render().el);
    });

    return this;
  }
});