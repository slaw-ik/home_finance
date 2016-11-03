App.Views.ExpendituresChart = App.Views.PieChart.extend({
    id: "radial-chart",
    className: "card",

    initialize: function () {
        App.Views.ExpendituresChart.__super__.initialize.apply(this, arguments);

        this.listenTo(this.model.get('rangeSelector'), 'changed', this._updateMyModel);
    },

    _updateMyModel: function (range) {
        this.model.set('dateFrom', range.get('dateFrom'));
        this.model.set('dateTo', range.get('dateTo'));

        this._onModelChanged(this.model);
    }
});