App.Views.Chart = App.Views.Base.extend({

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
                me.drawChart();
            }
        });
    },

    render: function () {
        App.Views.Chart.__super__.render.apply(this, arguments);
        // this.renderNested(this._header, '.chart_header');
        // this.renderNested(this, this.$el);
        this._onModelChanged(this.model);
        return this;
    }

});