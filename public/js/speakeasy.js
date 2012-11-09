var App;

App = Ember.Application.create();



App.Router = Ember.Router.extend({
  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: "/",
      redirectTo: "drinks"
    }),
    drinks: Ember.Route.extend({
      route: "/drinks",
      index: Ember.Route.extend({
        route: "/",
        connectOutlets: function(router) {
          var drinks;
          drinks = Ember.A([]);
          return router.get("applicationController").connectOutlet("drinks", drinks);
        }
      })
    })
  })
});



App.Store = DS.Store.extend({
  revision: 7,
  adapter: DS.FixtureAdapter.create({
    simulateRemoteResponse: false,
    serializer: DS.RESTSerializer
  })
});



App.Drink = DS.Model.extend({
  name: DS.attr("string")
});



App.Drink.FIXTURES = [
  {
    id: 1,
    name: "Sidecar"
  }, {
    id: 2,
    name: "Gin and Tonic"
  }
];


Ember.TEMPLATES["application"] = Ember.Handlebars.compile("<h1>Speakeasy Application Template</h1>\n<hr>\n{{outlet}}")


App.ApplicationView = Ember.View.extend();



App.ApplicationController = Ember.Controller.extend();


