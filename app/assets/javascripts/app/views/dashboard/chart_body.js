App.Views.ChartBody = App.Views.Base.extend({
  template: HandlebarsTemplates['dashboard/chart_body'],

  drawChart: function () {
    this.chart = c3.generate({
      bindto: this.$el.find("#myChart").get(0),
      data: {
        columns: this.model.get('columns'),
        type: 'donut',
        onclick: function (d, element) {
          return false
        }
      },
      donut: {
        label: {
          format: function (value, ratio, id) {
            return '€ ' + value.toFixed(2).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
              });
          }
        },
        width: 70,
        title: "Total: € " + this.model.get('total')
      },
      legend: {
        item: {
          onclick: function (id) {
            return false;
          }
        },
        position: 'right'
      }
    });
  }

});