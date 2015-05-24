App.Views.CircleDebetChart = App.Views.Chart.extend({

  initialize: function () {
    App.Views.CircleDebetChart.__super__.initialize.apply(this, arguments);

    var me = this,
      year = moment().year(),
      month = moment().month(),
      dateFrom = moment([year, month]),
      dateTo = moment(dateFrom).endOf('month');

    this.model = new App.Models.Report({
      type: 'debet',
      dateFrom: dateFrom,
      dateTo: dateTo,
      title: 'Діаграма витрат за період',
      viewId: 'my1'
    });

    this._header = new App.Views.ChartHeader({model: this.model});
    this._body = new App.Views.ChartBody({model: this.model});

    this.listenTo(App.Vent, "model:changed", function (model) {
      model.fetch({
        reset: true,
        data: {
          type: model.get('type'),
          dateFrom: model.get('dateFrom').format('DD/MM/YYYY'),
          dateTo: model.get('dateTo').format('DD/MM/YYYY')
        },
        success: function () {
          me._body.drawChart();
        }
      });
    });
  },

  render: function () {
    App.Views.CircleDebetChart.__super__.render.apply(this, arguments);
    this.renderNested(this._header, '.chart_header');
    this.renderNested(this._body, '.chart_body');
    App.Vent.trigger("model:changed", this.model);
    return this;
  }
})
;
