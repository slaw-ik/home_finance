(function ( $ ) {

    $(document).ready(function() {



        //materialize fn for navbar
         $(".button-collapse").sideNav();

        //materialize fn for datepickers
        //  $('.datepicker').pickadate({
        //     selectMonths: true, // Creates a dropdown to control month
        //     selectYears: 15 // Creates a dropdown of 15 years to control year
        //  });

        //materialize fn for selects
        $(document).ready(function() {
            $('select').material_select();
        });

        //materialize fn for dropdowns
        $('.dropdown-button').dropdown({
              inDuration: 300,
              outDuration: 225,
              constrain_width: true, // Does not change width of dropdown to that of the activator
              hover: false, // Activate on hover
              gutter: 0, // Spacing from edge
              belowOrigin: true, // Displays dropdown below the button
              alignment: 'left' // Displays dropdown with edge aligned to the left of button
            }
          );

        //materialize modal
        $('.modal-trigger').leanModal({
              dismissible: true, // Modal can be dismissed by clicking outside of the modal
              opacity: .8, // Opacity of modal background
              in_duration: 300, // Transition in duration
              out_duration: 200, // Transition out duration
              //ready: function() { alert('Ready'); }, // Callback for Modal open
              //complete: function() { alert('Closed'); } // Callback for Modal close
            }
          );

        //materialize tabs
        $(document).ready(function () {
            $('ul.tabs').tabs();
        });

        //fn for forgot password
        $('#forgot-trigger').click(function() {
            $('#forgot-body').slideToggle();
            $("#modal1").animate({ scrollTop: 500 }, 300);
        });

        //tables
        function tableFilterIcons() {
            var $table = $('table');

            $table.find('th').click(function() {
               $(this).closest($table).find('th').removeClass('active');
               $(this).addClass('active');
            });
        }

        tableFilterIcons();

        //toggling date-section on index page
        function dateSection() {
            var $trigger = $('.date-section-trigger'),
                $dateSection = $('.date-section');
            $dateSection.hide();
            $trigger.click(function() {
                $dateSection.slideToggle();
            });
        }

        dateSection();
    /*
    ==========================================
                   CHARTS
    ==========================================
    */

        //Global Styles
        Highcharts.setOptions({
            chart: {
                style: {
                    fontFamily: '"Roboto", sans-serif'
                }
            }
        });


        //radial chart
        $('#radial-chart').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Structure of expenditures'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: "category",
            colorByPoint: true,
            data: [{
                name: "Rent",
                y: 56.33
            }, {
                name: "Food",
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: "Entertaiment",
                y: 10.38
            }, {
                name: "Uncategorized",
                y: 5.7
            }]
        }]
    });

    //area-chart 

    $('#area-chart').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Revenue and expenses comparison'
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        plotOptions: {
            area: {
                pointStart: 2015,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Revenue',
            data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
                1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
        }, {
            name: 'Expenses',
            data: [null, null, null, null, null, null, null, null, null, null,
                5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
                33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
                35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                21000, 20000, 19000, 18000, 18000, 17000, 16000]
        }, {
            name: 'Profit',
            data: [null, null, null, null, null, null, null, null, null, null,
                5, 10, 10, 10, 15, 20, 42, 66, 86, 106, 160, 247, 332,
                423, 522, 612, 708, 833, 939, 1053, 1164, 1309, 1447,
                1591, 1738, 1905, 2120, 2304, 2533, 2795, 3002, 3209,
                3395, 3580, 3743, 3919, 4500, 4300, 4100, 3000, 3000,
                3500, 3300, 3100, 2900, 2700, 2500, 2400, 2300, 2200,
                2100, 2000, 1900, 1000, 1800, 1700, 1600]

        }]
    });//end area chart

    //column chart 
    $('#column-chart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Revenue/Expesnes/Profit'
        },
        xAxis: {
            type: 'category'
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [{
            name: "Brands",
            colorByPoint: true,
            data: [{
                name: "Revenue",
                y: 56.33,
                drilldown: "Revenue"
            }, {
                name: "Expenses",
                y: 24.03,
                drilldown: "Expenses"
            }, {
                name: "Profit",
                y: 10.38,
                drilldown: "Profit"
            }]
        }],
        drilldown: {
            series: [{
                name: "Revenu",
                id: "Revenu",
                data: [
                    [
                        "v11.0",
                        24.13
                    ],
                    [
                        "v8.0",
                        17.2
                    ],
                    [
                        "v9.0",
                        8.11
                    ],
                    [
                        "v10.0",
                        5.33
                    ],
                    [
                        "v6.0",
                        1.06
                    ],
                    [
                        "v7.0",
                        0.5
                    ]
                ]
            }, {
                name: "Expenses",
                id: "Expenses",
                data: [
                    [
                        "v40.0",
                        5
                    ],
                    [
                        "v41.0",
                        4.32
                    ],
                    [
                        "v42.0",
                        3.68
                    ],
                    [
                        "v39.0",
                        2.96
                    ],
                    [
                        "v36.0",
                        2.53
                    ],
                    [
                        "v43.0",
                        1.45
                    ],
                    [
                        "v31.0",
                        1.24
                    ],
                    [
                        "v35.0",
                        0.85
                    ],
                    [
                        "v38.0",
                        0.6
                    ],
                    [
                        "v32.0",
                        0.55
                    ],
                    [
                        "v37.0",
                        0.38
                    ],
                    [
                        "v33.0",
                        0.19
                    ],
                    [
                        "v34.0",
                        0.14
                    ],
                    [
                        "v30.0",
                        0.14
                    ]
                ]
            }, {
                name: "Profit",
                id: "Profit",
                data: [
                    [
                        "v35",
                        2.76
                    ],
                    [
                        "v36",
                        2.32
                    ],
                    [
                        "v37",
                        2.31
                    ],
                    [
                        "v34",
                        1.27
                    ],
                    [
                        "v38",
                        1.02
                    ],
                    [
                        "v31",
                        0.33
                    ],
                    [
                        "v33",
                        0.22
                    ],
                    [
                        "v32",
                        0.15
                    ]
                ]
            }]
        }
    });


    //wallet-chart

    $('#wallet-chart').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Family Wallets'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Amount'
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
        series: [{
            name: 'Jack White',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'Lindsey White',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        },
           {
            name: 'Family Wallet',
            data: [10.9, 10.2, 14.7, 28.5, 29.9, 35.2, 42.0, 32.6, 28.2,18.3, 6.6, 4.8]
        }]
    });

    }); //end ready

}( jQuery ));