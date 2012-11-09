App.DrinksController = Ember.ArrayController.extend
  content: (->
    App.get("router.store").findAll App.Drink
  ).property()