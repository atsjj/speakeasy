Speakeasy.Router = Ember.Router.extend({
  location: 'hash',

  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/',
      
      connectOutlets: function(router) {
        router.get('drinksController').set('content', router.store.findAll(Speakeasy.Drink));
        router.get('drinksController').connectOutlet('drinksCarousel');
        router.get('applicationController').connectOutlet('drinks');
      }
    })
  })
});

