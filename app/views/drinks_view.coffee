App.DrinksView = Ember.View.extend
  templateName: "drinks"
  selectedDrinkBinding: Ember.Binding.oneWay "this.controller.lastSelectedDrink"
  drinkIndex: (->
    index = @get("controller").indexOf @get("selectedDrink")
    index ?= 0
    index
  ).property("controller", "selectedDrink").volatile()
  didInsertElement: ->
    @$("ul").roundabout
      enableDrag: true
      startingChild: @get("drinkIndex")
    
    console.log "didInsertElement roundabout set to", @get("drinkIndex")
  selectedDrinkDidChange: (->
    unless @$("ul").data("roundabout")
      @$("ul").roundabout("animateToChild", @get("drinkIndex"), 0)
  ).property("drinkIndex")