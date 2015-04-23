App.Views.Transaction = App.Views.Base.extend({
  tagName: 'tr',
  template: HandlebarsTemplates['transaction'],

  events: {
    'click .edit-transaction': 'editTransaction',
    'click .delete-transaction': 'deleteTransaction'
  },

  editTransaction: function (e) {
    e.preventDefault();
    App.Vent.trigger("transaction:edit:cancel");
    var newElement = new App.Views.EditTransaction({model: this.model, old_model: this.model.clone()}).render().el,
      $prev = this.$el.prev(),
      $parent = this.$el.parent();

    if ($prev.length > 0) {
      $prev.after(newElement);
    } else {
      $parent.prepend(newElement);
    }

    this.off();
    this.remove();
  },

  deleteTransaction: function (e) {
    var me = this;
    e.preventDefault();
    if (confirm("Видалити транзакцію?")) {
      this.model.destroy({
        success: function (model, response) {
          me.off();
          me.remove();
        }
      });
    }
  }

});