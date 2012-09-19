Speakeasy.DrinksView = Ember.View.extend({
  templateName: 'drinks',
  didInsertElement: function() {
    this.$().find('#drinks').d3carousel();
  }
});
