App.Router = Ember.Router.extend
  enableLogging: true
  root: Ember.Route.extend
    goToRoot: Ember.Route.transitionTo("root.index")
    goToDrinks: Ember.Route.transitionTo("drinks.index")
    index: Ember.Route.extend
      route: "/"
      redirectTo: "drinks.index"
    drinks: Ember.Route.extend
      route: "/drinks"
      enter: ->
        App.Drink.find()
      goToDrink: (router, context) ->
        router.transitionTo("drinks.show", { id: context.context })
      index: Ember.Route.extend
        route: "/"
        connectOutlets: (router) ->
          router.get("applicationController").connectOutlet("drinks", App.Drink.find())
      show: Ember.Route.extend
        route: "/:id"
        connectOutlets: (router, context) ->
          router.get("drinksController").connectOutlet("drink", App.Drink.find(context.id))
          router.get("applicationController").connectOutlet("drinks", App.Drink.find())