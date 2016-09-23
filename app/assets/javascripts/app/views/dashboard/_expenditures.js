/**
 * Created by myroslav on 23.9.2016.
 */

App.Views.Expenditures = App.Views.Base.extend({

  template: HandlebarsTemplates['dashboard/expenditures'],

  initialize: function () {
    App.Views.Expenditures.__super__.initialize.apply(this, arguments);
  },

  render: function () {
    App.Views.Expenditures.__super__.render.apply(this, arguments);
    return this;
  }

});
