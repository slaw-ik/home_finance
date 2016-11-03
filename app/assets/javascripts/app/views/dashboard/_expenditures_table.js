App.Views.ExpendituresTable = App.Views.Base.extend({
    className: "card",

    template: JST['dashboard/expenditures_table'],

    initialize: function () {
        App.Views.ExpendituresTable.__super__.initialize.apply(this, arguments);

        this.listenTo(this.model.get('rangeSelector'), 'changed', this._updateMyModel);
    },

    _updateMyModel: function (range) {
        this.model.set('dateFrom', range.get('dateFrom'));
        this.model.set('dateTo', range.get('dateTo'));

        this._onModelChanged(this.model);
    },

    _onModelChanged: function (model) {
        var me = this;
        model.fetch({
            reset: true,
            data: {
                type: model.get('type'),
                dateFrom: model.get('dateFrom').format('DD/MM/YYYY'),
                dateTo: model.get('dateTo').format('DD/MM/YYYY')
            },
            success: function () {
                me.$('.chert_details').hide();
                me.drawTable();
            }
        });
    },

    drawTable: function () {
        App.Views.ExpendituresTable.__super__.render.apply(this, arguments);
    },

    render: function () {
        this._onModelChanged(this.model);
        return this;
    }
});