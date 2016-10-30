App.Views.DashboardPage = App.Views.Base.extend({
    // className: 'container',
    template: JST['dashboard/dashboard_page'],

    initialize: function () {
        App.Views.TransactionPage.__super__.initialize.apply(this, arguments);

        $(window).scroll(this.fixRangePanel);
    },

    render: function () {
        var me = this;
        App.Views.DashboardPage.__super__.render.apply(this, arguments);

        var charts = [
                new App.Views.CircleDebetChart(),
                new App.Views.LineTendencyChart(),
                new App.Views.BarChart(),
                new App.Views.BucketStateChart()
            ],
            rangeSelector = new App.Views.RangeSelector(),
            expenditures = new App.Views.Expenditures({rangeSelector: rangeSelector});


        me.$el.find('#range_section').append(rangeSelector.render().el);
        me.$el.find('#expenditures').append(expenditures.render().el);

        _.each(charts, function (chart) {
            me.$el.find('#chart_section').append(chart.render().el);
        });

        return this;
    },

    fixRangePanel: function () {
        if ($('body').scrollTop() > 64) {
            $('#range_section').addClass("fix-panel");
        } else {
            $('#range_section').removeClass("fix-panel");
        }
    }
});