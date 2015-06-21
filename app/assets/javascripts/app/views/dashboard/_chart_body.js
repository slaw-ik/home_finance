App.Views.ChartBody = App.Views.Base.extend({
  template: HandlebarsTemplates['dashboard/chart_body'],

  drawChart: function () {
    var bindto = this.$el.find("#myChart").get(0);

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
            xs: {
              'Debet': 'debet_dates',
              'Credit': 'credit_dates'
            },
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
      case 'bar':
        this.chart = c3.generate({
          bindto: bindto,
          data: {
            xs: {
              'Debet': 'debet_dates',
              'Credit': 'credit_dates'
            },
            columns: this.model.get('columns'),
            type: 'bar'
          },
          bar: {
            width: {
              ratio: 0.5 // this makes bar width 50% of length between ticks
            }
            // or
            //width: 100 // this makes bar width 100px
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
      case 'bucket_state':
        this.chart = c3.generate({
          bindto: bindto,
          data: {
            xs: {
              'Bucket state': 'debet_dates'
            },
            columns: this.model.get('columns'),
            type: 'area'
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