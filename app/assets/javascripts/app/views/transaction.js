App.Views.Transaction = App.Views.Base.extend({
  tagName: 'tr',
  template: HandlebarsTemplates['transaction'],

  events: {
    'click .edit-transaction': 'editTransaction',
    'click .delete-transaction': 'deleteTransaction'
  },

  editTransaction: function (e) {
    e.preventDefault();
    this.$el.replaceWith(new App.Views.EditTransaction({model: this.model}).render().el);
  },

  deleteTransaction: function (e) {
    e.preventDefault();
    alert(this.model.get('id'));
  }

});