App.Views.BarChart = App.Views.Chart.extend({

  initialize: function () {
    App.Views.BarChart.__super__.initialize.apply(this, arguments);

    var year = moment().year(),
      dateFrom = moment([year]),
      dateTo = moment(dateFrom).endOf('year');

    this.model = new App.Models.Report({
      type: 'bar',
      dateFrom: dateFrom,
      dateTo: dateTo,
      title: 'Тенденція за період',
      viewId: 'my3'
    });

    this._header = new App.Views.ChartHeader({model: this.model});
    this._body = new App.Views.ChartBody({model: this.model});

    this.listenTo(this._header, 'changed', this._onModelChanged);
  }
});
