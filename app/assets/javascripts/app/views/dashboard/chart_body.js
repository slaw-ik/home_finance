App.Views.ChartBody = App.Views.Base.extend({
  template: HandlebarsTemplates['dashboard/chart_body'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this._onModelReset);
  },

  _onModelReset: function () {
    var chart = c3.generate({
      bindto: this.$el.find("#myChart").get(0),
      data: {
        columns: [
          ['data1', 250],
          ['data2', 25]
        ],
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
        title: "Total: € 275.00"
      },
      legend: {
        item: {
          onclick: function (id) {
            return false;
          }
        }
      }
    });
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