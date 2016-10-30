/**
 * Created by myroslav on 12.08.16.
 */

App.Views.RangeSelector = App.Views.Base.extend({
    template: JST['dashboard/range_selector'],

    initialize: function () {
        App.Views.RangeSelector.__super__.initialize.apply(this, arguments);

        var year = moment().year(),
            month = moment().month();

        this.dateFrom = moment([year, month]);
        this.dateTo = moment(this.dateFrom).endOf('month');
    },

    render: function () {

        var me = this,
            fired = false;
        App.Views.RangeSelector.__super__.render.apply(this, arguments);


        this.$('#datepicker').datepicker({
            todayBtn: "linked",
            language: "uk",
            autoclose: true,
            todayHighlight: true,
            format: 'd M. yyyy'
        }).on('changeDate', function (e) {
            if (!fired) {
                var key = e.target.attributes['data-attr'].value,
                    val = moment(e.date);
                me.rangeChanged(key, val);
            }
            fired = !fired;
        });

        return this;

    }
});
