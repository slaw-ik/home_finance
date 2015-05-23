App.Views.ChartBody = App.Views.Base.extend({
  template: HandlebarsTemplates['dashboard/chart_body'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this._onModelReset);
  },

  _onModelReset: function () {
    var data = [
      {
        value: 300,
        color: "#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
      },
      {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
      },
      {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
      }
    ];

    var ctx = this.$el.find("#myChart").get(0).getContext("2d");
    var myPieChart = new Chart(ctx).Pie(data)

  },

  //render: function () {
  //
  //
  //  App.Views.ChartBody.__super__.render.apply(this, arguments);
  //
  //
  //  return this
  //}


});