Speakeasy.DrinksCarouselView = Ember.CollectionView.extend({
  contentBinding: 'Speakeasy.router.drinksController.content',
  tagName: 'ul',
  classNames: ['carousel'],
  
  offsetWidth: function() {
    return (this.$()[0].offsetWidth==0)?210:this.$()[0].offsetWidth;
  }.property(),
  
  willInsertElement: function() {
    this.$().css({ 'position':'absolute', 'width':'100%', 'height':'100%', 'WebkitTransformStyle':'preserve-3d', 'WebkitTransition':'-webkit-transform 1s' });
  },
  
  didInsertElement: function() {
    var radius = (this.get('offsetWidth') / 2) / Math.tan(Math.PI / this.get('content.length'));
    var theta = (360 / this.get('content.length'));
    var rotation = theta * 0 * -1;
    rotation = Math.round(rotation / theta) * theta;
    
    this.$().css('WebkitTransform', 'translateZ(-'+radius+'px) rotateY('+rotation+'deg)');
  },
  
  itemViewClass: Ember.View.extend({
    tagName: 'li',
    templateName: 'drink_figurine',
    classNames: ['figurine'],
    
    willInsertElement: function() {
      var radius = (this.get('parentView.offsetWidth') / 2) / Math.tan(Math.PI / this.get('parentView.content.length'));
      var theta = (360 / this.get('parentView.content.length'));
      var position = this.get('contentIndex');
      
      var rotation = theta * 0 * -1;
      rotation = Math.round(rotation / theta) * theta;
      
      this.$().css('WebkitTransform', 'rotateY('+(theta * position)+'deg) translateZ('+radius+'px)');
    }
  })
});
