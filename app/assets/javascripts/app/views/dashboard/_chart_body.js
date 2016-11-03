App.Views.ChartBody = App.Views.Base.extend({

  drawChart: function () {
    var me = this,
      bindto = this.$el;

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
              showInLegend: false,
              point: {
                events: {
                  click: function (event) {
                    me.trigger('pie_clicked', this);
                  }
                }
              }
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
            type: 'line',
            zoomType: 'x'
          },
          title: {
            text: this.model.get('title')
          },
          xAxis: {
            type: 'datetime'
          },
          yAxis: {
            title: {
              text: 'Сума (€)'
            }
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true
              },
              enableMouseTracking: true
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
          title: {
            text: this.model.get('title')
          },
          xAxis: {
            type: 'datetime'
          },
          yAxis: {
            title: {
              text: 'Сума (€)'
            }
          },
          plotOptions: {
            series: {
              allowPointSelect: false
            }
          },
          series: this.model.get('series')
        });
        break;
      case 'bucket_state':
        this.chart = bindto.highcharts({
          chart: {
            zoomType: 'x'
          },
          title: {
            text: this.model.get('title')
          },
          xAxis: {
            type: 'datetime'
          },
          yAxis: {
            title: {
              text: 'Сума (€)'
            }
          },
          plotOptions: {
            area: {
              marker: {
                radius: 2
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 1
                }
              },
              threshold: null
            }
          },
          series: this.model.get('series')
        });
        break;
      default:
      //
    }

  }

});