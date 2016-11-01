/**
 * Created by myroslav on 12.08.16.
 */

App.Views.RangeSelector = App.Views.Base.extend({
    template: JST['dashboard/range_selector'],

    initialize: function () {
        App.Views.RangeSelector.__super__.initialize.apply(this, arguments);

        var year = moment().year(),
            month = moment().month();

        this.model = new App.Models.Range({
            dateFrom: moment([year, month]),
            dateTo: moment(this.dateFrom).endOf('month')
        });
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
    },

    rangeChanged: function () {
        var me = this;

        if (_.isObject(arguments[0])) {
            _.each(arguments[0], function (val, key) {
                me.model.set(key, val);
            })
        } else {
            me.model.set(arguments[0], arguments[1]);
        }
        this.trigger('changed', this.model);
    }
});
