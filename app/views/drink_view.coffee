App.DrinkView = Ember.View.extend
  attributeNames: ["role", "aria-labeledby", "aria-hidden"]
  classNames: ["modal", "hide", "fade"]
  "aria-labeledby": "drinkView"
  "aria-hidden": "true"
  role: "dialog"
  templateName: "drink"
  didInsertElement: ->
    @$().modal "show"
    @$().on "hidden", $.proxy(((event) ->
      App.get("router").transitionTo("drinks.index")
    ), @)
  willDestroyElement: ->
    @$().modal "hide"