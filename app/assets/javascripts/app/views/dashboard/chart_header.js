App.Views.ChartHeader = App.Views.Base.extend({
  template: HandlebarsTemplates['dashboard/chart_header'],

  initialize: function () {
    App.Views.ChartHeader.__super__.initialize.apply(this, arguments);
  },

  render: function () {
    App.Views.ChartHeader.__super__.render.apply(this, arguments);

    this.$el.find('.input-daterange.input-group').datepicker({
      todayBtn: "linked",
      language: "uk",
      autoclose: true,
      todayHighlight: true,
      format: 'd M. yyyy'
    })
  }

});