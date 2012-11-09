App.Router = Ember.Router.extend
  enableLogging: true
  root: Ember.Route.extend
    index: Ember.Route.extend
      route: "/"
      redirectTo: "drinks"
    drinks: Ember.Route.extend
      route: "/drinks"
      index: Ember.Route.extend
        route: "/"
        connectOutlets: (router) ->
          router.get("applicationController").connectOutlet("drinks")