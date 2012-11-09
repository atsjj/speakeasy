var App;

App = Ember.Application.create();



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
  }, {
    id: 3,
    name: "Manhattan"
  }
];



App.Store = DS.Store.extend({
  revision: 7,
  adapter: DS.FixtureAdapter.create({
    simulateRemoteResponse: false,
    serializer: DS.RESTSerializer
  })
});



App.ApplicationController = Ember.Controller.extend();



App.DrinksController = Ember.ArrayController.extend({
  content: (function() {
    return App.get("router.store").findAll(App.Drink);
  }).property()
});



App.ApplicationView = Ember.View.extend({
  templateName: "application"
});



App.DrinksView = Ember.View.extend({
  templateName: "drinks",
  didInsertElement: function() {
    return this.$("ul").roundabout();
  }
});


Ember.TEMPLATES["application"] = Ember.Handlebars.compile("<h1>Speakeasy Application Template</h1>\n<hr>\n{{outlet}}");
Ember.TEMPLATES["drinks"] = Ember.Handlebars.compile("<h2>Drinks Carousel Here</h2>\n<ul class=\"roundabout\">\n  {{#each drink in view.controller}}\n    {{#with drink}}\n      <li><span>{{name}}</span></li>\n    {{/with}}\n  {{/each}}\n</ul>");



App.Router = Ember.Router.extend({
  enableLogging: true,
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
          return router.get("applicationController").connectOutlet("drinks");
        }
      })
    })
  })
});


