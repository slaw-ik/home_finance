/**
 * Created by myroslav on 13.08.16.
 */

App.Views.Expenditures = App.Views.Base.extend({

    template: JST['dashboard/expenditures'],

    initialize: function () {
        App.Views.Expenditures.__super__.initialize.apply(this, arguments);

        this.model = new App.Models.Report({
            type: 'debet',
            rangeSelector: this.rangeSelector,
            dateFrom: this.rangeSelector.dateFrom,
            dateTo: this.rangeSelector.dateTo,
            title: 'Діаграма витрат за період',
            viewId: 'my1'
        });

        this._chart = new App.Views.ExpendituresChart({model: this.model});
    },


    render: function () {
        App.Views.Expenditures.__super__.render.apply(this, arguments);

        this.$el.find('.chart-container').append(this._chart.render().el);

        return this;
    }
});