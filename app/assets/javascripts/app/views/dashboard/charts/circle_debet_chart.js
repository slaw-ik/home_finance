App.Views.CircleDebetChart = App.Views.Chart.extend({
  className: 'chart container',
  template: JST['dashboard/charts/circle_debet_chart'],

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

    this.listenTo(this._header, 'changed', this._onModelChanged);
    this.listenTo(this._body, 'pie_clicked', this._onPieClicked);
  },

  _onPieClicked: function (section) {
    if (section.state == "select") {
      this.hideTable();
    } else {
      this.showTable(section.id);
    }
  },

  showTable: function (categoryId) {
    var params = {
        type: 'debet',
        categoryId: categoryId,
        dateFrom: this.model.get('dateFrom').format('DD/MM/YYYY'),
        dateTo: this.model.get('dateTo').format('DD/MM/YYYY')
      },
      transactions = new App.Views.Transactinos({collection: new App.Collections.Transactions(params)});
    this.$('#transactions-table table tbody').replaceWith(transactions.render().el);
    this.$('.chert_details').show();
  },

  hideTable: function () {
    this.$('.chert_details').hide();
  },

  render: function () {
    App.Views.CircleDebetChart.__super__.render.apply(this, arguments);
    return this;
  }
});
