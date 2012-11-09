App.DrinksView = Ember.View.extend
  templateName: "drinks"
  didInsertElement: ->
    @$("ul").roundabout()