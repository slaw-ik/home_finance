App.Models.Transaction = Backbone.Model.extend({
  urlRoot: '/transactions',

  defaults: {
    title: "",
    category: "",
    currency_id: 0,
    category_id: 0,
    amount: 0
  },

  parse: function (raw) {
    raw.date = moment(raw.date);
    return raw;
  },

  initialize: function (params) {
    this.type = params['type'] ? params['type'] : 'debet';
  },

  validate: function (attrs, options) {
    var errors = {};

    if (!attrs.date || (attrs.date == "Invalid date")) {
      errors.date = "Date is required field!"
    }

    if (!attrs.title) {
      errors.title = "Title is required field!"
    }

    if (!attrs.category_id || isNaN(parseInt(attrs.category_id)) || parseInt(attrs.category_id) < 0) {
      errors.category_id = "Category is required field!"
    }

    if (!attrs.currency_id || isNaN(parseInt(attrs.currency_id)) || parseInt(attrs.currency_id) < 0) {
      errors.currency_id = "Currency is required field!"
    }

    if (!attrs.amount || isNaN(parseFloat(attrs.amount)) || parseFloat(attrs.amount) < 0) {
      errors.amount = "Amount is required field and should be greater than 0!"
    }

    if (!_.isEmpty(errors)) {
      return errors
    }

  }
});

App.Collections.Transactions = Backbone.Collection.extend({
  model: App.Models.Transaction,
  url: function () {
    return '/transactions?type=' + this.type
  },

  initialize: function (params) {
    this.type = params['type'] ? params['type'] : 'debet';
  }
});