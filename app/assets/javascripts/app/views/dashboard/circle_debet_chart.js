App.Views.CircleDebetChart = App.Views.Chart.extend({

  initialize: function () {
    App.Views.CircleDebetChart.__super__.initialize.apply(this, arguments);

    var year = moment().year(),
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

//    this.model.on('change:dateTo change:dateFrom', this._onModelChanged, this);
    this.listenTo(this.model, 'change:dateTo change:dateFrom', this._onModelChanged);
  }
});
