App.Views.ChartHeader = App.Views.Base.extend({
  template: HandlebarsTemplates['dashboard/chart_header'],

  rangeChanged: function () {
    var me = this;
    if (_.isObject(arguments[0])) {
      _.each(arguments[0], function (val, key) {
        me.model.set(key, val);
      })
    } else {
      me.model.set(arguments[0], arguments[1]);
    }
    me.trigger('changed', me.model);
  },

  render: function () {
    var me = this,
      fired = false;
    App.Views.ChartHeader.__super__.render.apply(this, arguments);

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

    this.$('.range-selector .range').on('click', function () {
      var monthsCount = $(this).data('range'),
        dateTo = moment().endOf('month'),
        dateFrom = moment().subtract(monthsCount, 'months').startOf('month');
      me.$('#datepicker #start').datepicker('setDate', dateFrom.format('DD-MM-YYYY'));
      me.$('#datepicker #end').datepicker('setDate', dateTo.format('DD-MM-YYYY'));
    })
  }

});