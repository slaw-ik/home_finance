App.Views.LineTendencyChart = App.Views.Chart.extend({

  initialize: function () {
    App.Views.LineTendencyChart.__super__.initialize.apply(this, arguments);

    var year = moment().year(),
      month = moment().month(),
      dateFrom = moment([year]),
      dateTo = moment(dateFrom).endOf('year');

    this.model = new App.Models.Report({
      type: 'tendency',
      dateFrom: dateFrom,
      dateTo: dateTo,
      title: 'Тенденція за період',
      viewId: 'my2'
    });

    this._header = new App.Views.ChartHeader({model: this.model});
    this._body = new App.Views.ChartBody({model: this.model});

    this.listenTo(this._header, 'changed', this._onModelChanged);
  }
})
;
