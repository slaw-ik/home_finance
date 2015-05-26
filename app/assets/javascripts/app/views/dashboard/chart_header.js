App.Views.ChartHeader = App.Views.Base.extend({
  template: HandlebarsTemplates['dashboard/chart_header'],

  initialize: function () {
    App.Views.ChartHeader.__super__.initialize.apply(this, arguments);
  },

  render: function () {
    var me = this, fired = false;
    App.Views.ChartHeader.__super__.render.apply(this, arguments);

    this.$el.find('.input-daterange.input-group').datepicker({
      todayBtn: "linked",
      language: "uk",
      autoclose: true,
      todayHighlight: true,
      format: 'd M. yyyy'
    }).on('changeDate', function (e) {
      if (!fired) {
        var key = e.target.attributes['data-attr'].value,
          val = moment(e.date);
        me.model.set(key, val);
        me.model.trigger('changed', me.model);
      }
      fired = !fired;
    });
  }

});