App.DrinksView = Ember.View.extend
  templateName: "drinks"
  selectedDrinkBinding: Ember.Binding.oneWay "this.controller.lastSelectedDrink"
  drinkIndex: (->
    index = @get("controller").indexOf @get("selectedDrink")
    index = 0 unless index > 0
    index
  ).property("controller", "selectedDrink").volatile()
  didInsertElement: ->
    @$("ul").roundabout
      enableDrag: true
      startingChild: @get("drinkIndex")
      tilt: -2
      maxScale: 1.2
  selectedDrinkDidChange: (->
    unless @$("ul").data("roundabout")
      @$("ul").roundabout("animateToChild", @get("drinkIndex"), 0)
  ).property("drinkIndex")