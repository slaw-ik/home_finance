App.Views.ChartBody = App.Views.Base.extend({
  template: HandlebarsTemplates['dashboard/chart_body'],

  drawChart: function () {
    var bindto = this.$el.find("#myChart").get(0);
    debugger;
    switch (this.model.get('type')) {
      case 'debet':
        this.chart = c3.generate({
          bindto: bindto,
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
        break;
      case 'tendency':
        this.chart = c3.generate({
          bindto: bindto,
          data: {
            x: 'x',
            columns: this.model.get('columns')
          },
          axis: {
            x: {
              type: 'timeseries',
              tick: {
                format: '%d-%m-%Y'
              }
            }
          }
        });
        break;
      default:
      //
    }

  }

});