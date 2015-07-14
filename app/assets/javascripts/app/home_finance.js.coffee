#= require_self
#= require_tree ./models
#= require_tree ./templates
#= require_tree ./views
#= require_tree ./routers

window.App =
  Routers: {}
  Views: {}
  Models: {}
  Collections: {}
  Vent: _.clone(Backbone.Events)

  initialize: ->
    moment.locale('uk')

    Highcharts.setOptions
      global:
        useUTC: false
      lang:
        months: moment.months()
        weekdays: moment.weekdays()
        shortMonths: moment.monthsShort()

    new App.Routers.MainRouter()
    Backbone.history.start()