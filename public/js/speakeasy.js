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
  lastSelectedDrink: null
});



App.DrinkController = Ember.ObjectController.extend();



App.ApplicationView = Ember.View.extend({
  layoutName: "layout",
  templateName: "application"
});



App.DrinksView = Ember.View.extend({
  templateName: "drinks",
  selectedDrinkBinding: Ember.Binding.oneWay("this.controller.lastSelectedDrink"),
  drinkIndex: (function() {
    var index;
    index = this.get("controller").indexOf(this.get("selectedDrink"));
    if (!(index > 0)) {
      index = 0;
    }
    return index;
  }).property("controller", "selectedDrink").volatile(),
  didInsertElement: function() {
    return this.$("ul").roundabout({
      enableDrag: true,
      maxScale: 1.2,
      startingChild: this.get("drinkIndex"),
      tilt: -2
    });
  },
  selectedDrinkDidChange: (function() {
    if (!this.$("ul").data("roundabout")) {
      return this.$("ul").roundabout("animateToChild", this.get("drinkIndex"), 0);
    }
  }).property("drinkIndex")
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


Ember.TEMPLATES["application"] = Ember.Handlebars.compile("{{outlet}}");
Ember.TEMPLATES["drink"] = Ember.Handlebars.compile("{{#with view.controller}}\n  <div class=\"modal-header\">\n    <h3 id=\"drinkView\">{{name}} Recipe</h3>\n  </div>\n  <div class=\"modal-body\">\n    <p>\n      <ol>\n        <li>Booze.</li>\n        <li>Booze.</li>\n        <li>More Booze.</li>\n      </ol>\n    </p>\n    <p>\n      Drink some, then drink s'more!\n    </p>\n  </div>\n{{/with}}");
Ember.TEMPLATES["drinks"] = Ember.Handlebars.compile("<ul class=\"roundabout\">\n  {{#each drink in view.controller}}\n    {{#with drink}}\n      <li {{action goToDrink id}}>{{name}}</li>\n    {{/with}}\n  {{/each}}\n</ul>\n{{outlet}}");
Ember.TEMPLATES["layout"] = Ember.Handlebars.compile("<header class=\"navbar navbar-fixed-top\">\n  <div class=\"navbar-inner\">\n    <div class=\"container-fluid\">\n      <a class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\">\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </a>\n      <a class=\"brand\" href=\"#\">Speakeasy</a>\n      <div class=\"nav-collapse collapse\">\n        <ul class=\"nav\">\n          <li><a {{action goToDrinks}} href=\"#/drinks\">Drinks</a></li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</header>\n<div class=\"container\">\n  <div class=\"row-fluid\">\n    <div class=\"span12\">\n      {{yield}}\n    </div>\n  </div>\n</div>");



App.Router = Ember.Router.extend({
  enableLogging: true,
  root: Ember.Route.extend({
    goToRoot: Ember.Route.transitionTo("root.index"),
    goToDrink: function(router, context) {
      return router.transitionTo("drinks.show", {
        id: context.context
      });
    },
    goToDrinks: Ember.Route.transitionTo("drinks.index"),
    index: Ember.Route.extend({
      route: "/",
      enter: function(router) {
        return router.send("goToDrinks");
      }
    }),
    drinks: Ember.Route.extend({
      route: "/drinks",
      enter: function(router) {
        return App.Drink.find();
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
          var selectedDrink, _ref;
          if ((_ref = context.id) == null) {
            context.id = 0;
          }
          selectedDrink = App.Drink.find(context.id);
          router.get("drinksController").set("lastSelectedDrink", selectedDrink);
          return router.get("drinksController").connectOutlet("drink", selectedDrink);
        }
      })
    })
  })
});


