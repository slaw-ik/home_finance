App.Views.ExpendituresChart = App.Views.Chart.extend({
    // template: JST['dashboard/expenditures_chart'],

    initialize: function () {
        App.Views.ExpendituresChart.__super__.initialize.apply(this, arguments);

        this._body = new App.Views.ChartBody({model: this.model});

        this.listenTo(this.model.get('rangeSelector'), 'changed', this._updateMyModel);
    },

    _updateMyModel: function (range) {
        this.model.set('dateFrom', range.get('dateFrom'));
        this.model.set('dateTo', range.get('dateTo'));

        this._onModelChanged(this.model);
    }
});