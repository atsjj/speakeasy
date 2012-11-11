App.Router = Ember.Router.extend
  enableLogging: true
  root: Ember.Route.extend
    goToRoot: Ember.Route.transitionTo("root.index")
    goToDrink: (router, context) ->
      router.transitionTo("drinks.show", { id: context.context })
    goToDrinks: Ember.Route.transitionTo("drinks.index")
    index: Ember.Route.extend
      route: "/"
      enter: (router) ->
        router.send("goToDrinks")
    drinks: Ember.Route.extend
      route: "/drinks"
      enter: (router) ->
        App.Drink.find()
      index: Ember.Route.extend
        route: "/"
        connectOutlets: (router) ->
          router.get("applicationController").connectOutlet("drinks", App.Drink.find())
      show: Ember.Route.extend
        route: "/:id"
        connectOutlets: (router, context) ->
          context.id ?= 0
          selectedDrink = App.Drink.find(context.id)
          router.get("drinksController").set("lastSelectedDrink", selectedDrink)
          router.get("drinksController").connectOutlet("drink", selectedDrink)