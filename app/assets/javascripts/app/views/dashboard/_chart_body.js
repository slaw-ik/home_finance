App.Views.ChartBody = App.Views.Base.extend({
  template: HandlebarsTemplates['dashboard/chart_body'],

  drawChart: function () {
    var bindto = this.$el.find("#myChart");

    switch (this.model.get('type')) {
      case 'debet':
        this.chart = bindto.highcharts({
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: this.model.get('total') + ' €',
            verticalAlign: 'middle',
            floating: true
          },
          tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {point.name}: <b>{point.y} €</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: "({point.percentage:.1f}%) {point.name} "
              },
              innerSize: '50%',
              showInLegend: false
            }
          },
          //legend: {
          //  align: 'right',
          //  verticalAlign: 'top',
          //  layout: 'vertical',
          //  x: 0,
          //  y: 100
          //},
          series: [
            {
              series: '',
              colorByPoint: true,
              data: this.model.get('columns')
            }
          ]
        });
        break;
      case 'tendency':
        this.chart = bindto.highcharts({
          chart: {
            type: 'line'
          },
          title: {
            text: 'Monthly Average Temperature'
          },
          subtitle: {
            text: 'Source: WorldClimate.com'
          },
          xAxis: {
            categories: this.model.get('categories')
          },
          yAxis: {
            title: {
              text: 'Temperature (°C)'
            }
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true
              },
              enableMouseTracking: false
            }
          },
          series: this.model.get('series')
        });

        break;
      case 'bar':
        this.chart = bindto.highcharts({
          chart: {
            type: 'column'
          },
          xAxis: {
            categories: this.model.get('categories')
          },
          plotOptions: {
            series: {
              allowPointSelect: false
            }
          },
          series: this.model.get('series')
        });
        break;
      case 'bucket_state_old':
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
      case 'bucket_state':
        this.chart = bindto.highcharts({
          chart: {
            type: 'area'
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },

          series: [
            {
              data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
              color: '#FF0000'
            }
          ]
        });
        break;
      default:
      //
    }

  }

});