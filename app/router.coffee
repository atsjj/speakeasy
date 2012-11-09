App.Router = Ember.Router.extend
  root: Ember.Route.extend
    index: Ember.Route.extend
      route: "/"
      redirectTo: "drinks"
    drinks: Ember.Route.extend
      route: "/drinks"
      index: Ember.Route.extend
        route: "/"
        connectOutlets: (router) ->
          drinks = Ember.A([])
          router.get("applicationController").connectOutlet("drinks", drinks)