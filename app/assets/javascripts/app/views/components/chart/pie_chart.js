App.Views.PieChart = App.Views.Chart.extend({

    drawChart: function () {
        var me = this;

        this.chart = this.$el.highcharts({
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
            series: [
                {
                    series: '',
                    colorByPoint: true,
                    data: this.model.get('columns')
                }
            ]
        });

    }


});