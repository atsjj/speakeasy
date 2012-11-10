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



App.DrinksController = Ember.ArrayController.extend();



App.DrinkController = Ember.ObjectController.extend();



App.ApplicationView = Ember.View.extend({
  templateName: "application"
});



App.DrinksView = Ember.View.extend({
  templateName: "drinks",
  didInsertElement: function() {
    return this.$("ul").roundabout({
      enableDrag: true
    });
  }
});



App.DrinkView = Ember.View.extend({
  attributeNames: ["role", "aria-labeledby", "aria-hidden"],
  classNames: ["modal", "hide", "fade"],
  "aria-labeledby": "drinkView",
  "aria-hidden": "true",
  role: "dialog",
  templateName: "drink",
  didInsertElement: function() {
    this.$().modal("show");
    return this.$().on("hidden", $.proxy((function(event) {
      return App.get("router").transitionTo("drinks.index");
    }), this));
  },
  willDestroyElement: function() {
    return this.$().modal("hide");
  }
});


Ember.TEMPLATES["application"] = Ember.Handlebars.compile("<div class=\"navbar navbar-fixed-bottom\">\n  <div class=\"navbar-inner\">\n    <div class=\"container\">\n      <a class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\">\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </a>\n      <a class=\"brand\" href=\"#\" {{action goToRoot}}>Speakeasy</a>\n      <div class=\"nav-collapse collapse\">\n        <ul class=\"nav\">\n          <li><a {{action goToDrinks}} href=\"#/drinks\">Drinks</a></li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"row-fluid\">\n  <div class=\"span12\">\n    {{outlet}}\n  </div>\n</div>");
Ember.TEMPLATES["application"] = Ember.Handlebars.compile("<h1>Speakeasy Application Template</h1>\n<hr>\n{{outlet}}");
Ember.TEMPLATES["drink"] = Ember.Handlebars.compile("{{#with view.controller}}\n  <div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>\n    <h3 id=\"drinkView\">{{name}} Recipe</h3>\n  </div>\n  <div class=\"modal-body\">\n    <p>\n      <ol>\n        <li>Booze.</li>\n        <li>Booze.</li>\n        <li>More Booze.</li>\n      </ol>\n    </p>\n    <p>\n      Drink some, then drink s'more!\n    </p>\n  </div>\n  <div class=\"modal-footer\">\n    <button class=\"btn\" data-dismiss=\"modal\" aria-hidden=\"true\">Close</button>\n  </div>\n{{/with}}");
Ember.TEMPLATES["drinks"] = Ember.Handlebars.compile("<ul class=\"roundabout\">\n  {{#each drink in view.controller}}\n    {{#with drink}}\n      <li><span {{action goToDrink id}}>{{name}}</span></li>\n    {{/with}}\n  {{/each}}\n</ul>\n{{outlet}}");



App.Router = Ember.Router.extend({
  enableLogging: true,
  root: Ember.Route.extend({
    goToRoot: Ember.Route.transitionTo("root.index"),
    goToDrinks: Ember.Route.transitionTo("drinks.index"),
    index: Ember.Route.extend({
      route: "/",
      redirectTo: "drinks.index"
    }),
    drinks: Ember.Route.extend({
      route: "/drinks",
      enter: function() {
        return App.Drink.find();
      },
      goToDrink: function(router, context) {
        return router.transitionTo("drinks.show", {
          id: context.context
        });
      },
      index: Ember.Route.extend({
        route: "/",
        connectOutlets: function(router) {
          return router.get("applicationController").connectOutlet("drinks", App.Drink.find());
        }
      }),
      show: Ember.Route.extend({
        route: "/:id",
        connectOutlets: function(router, context) {
          router.get("drinksController").connectOutlet("drink", App.Drink.find(context.id));
          return router.get("applicationController").connectOutlet("drinks", App.Drink.find());
        }
      })
    })
  })
});


