App.Views.DashboardPage = App.Views.Base.extend({
  // className: 'container',
  template: HandlebarsTemplates['dashboard/dashboard_page'],

  initialize: function () {
    App.Views.TransactionPage.__super__.initialize.apply(this, arguments);
  },

  render: function () {
    var me = this;
    App.Views.DashboardPage.__super__.render.apply(this, arguments);

    var charts = [
        new App.Views.CircleDebetChart(),
        new App.Views.LineTendencyChart(),
        new App.Views.BarChart(),
        new App.Views.BucketStateChart()
      ],
      rangeSelector = new App.Views.RangeSelector(),
      expenditures = new App.Views.Expenditures(),
      radialChart = new App.Views.CircleDebetChart();


    this.$el.find('#range_section').append(rangeSelector.render().el);
    this.$el.find('#expenditures').append(expenditures.render().el);

    this.$el.find('#radial-chart').append(radialChart.render().el);

    // _.each(charts, function (chart) {
    //     me.$el.find('#chart_section').append(chart.render().el);
    // });

    return this;
  }
});