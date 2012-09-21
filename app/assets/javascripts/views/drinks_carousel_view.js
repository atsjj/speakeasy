Speakeasy.DrinksCarouselView = Ember.CollectionView.extend({
  contentBinding: 'Speakeasy.router.drinksController.content',
  tagName: 'ul',
  classNames: ['carousel'],
  _rotation: 0,
  _interval: 1,
  
  offsetWidth: function() {
    this.createElement()
    return (this.$()[0].offsetWidth==0) ? 210 : this.$()[0].offsetWidth
  }.property('$'),
  
  radius: function() {
    return (this.get('offsetWidth') / 2) / Math.tan(Math.PI / this.get('content.length'))
  }.property('offsetWidth', 'content.length'),
  
  theta: function() {
    return 360 / this.get('content.length')
  }.property('Speakeasy.router.drinksController.content', 'content.length'),
  
  interval: function ( key, value ) {
    if (arguments.length === 1) {
      return this.get('_interval')
    } else {
      this.set('_interval', value)
      return value
    }
  }.property('_interval'),
  
  rotation: function() {
    console.log(this.get('_rotation'), this.get('interval'), this.get('theta'))
    
    var rotation = this.get('_rotation')
    rotation += this.get('theta') * this.get('interval') * -1
    rotation = Math.round(rotation / this.get('theta')) * this.get('theta')
    
    this.set('_rotation', rotation)
    
    return rotation
  }.property('_rotation', 'theta', 'interval'),
  
  transform: function() {
    this.$().css('WebkitTransform', 'rotateY(' + this.get('rotation') + 'deg) translateZ(-' + this.get('radius') + 'px)')
    console.log('fired carousel')
  }.observes('interval', 'content.length').property('$', 'rotation', 'radius'),
  
  willInsertElement: function() {
    var map = {
      'position':'absolute',
      'width':'100%',
      'height':'100%',
      'WebkitTransformStyle':'preserve-3d',
      'WebkitTransition':'-webkit-transform 1s'
    }
    
    this.$().css(map);
    this.get('transform')
  },
  
  slide: function( key, value ) {
    this.set('interval', value)
  }.property('inverval'),
  
  itemViewClass: Ember.View.extend({
    tagName: 'li',
    templateName: 'drink_figurine',
    classNames: ['figurine'],
    
    radius: function() {
      return (this.get('parentView.offsetWidth') / 2) / Math.tan(Math.PI / this.get('parentView.content.length'))
    }.property('parentView.offsetWidth', 'parentView.content.length'),
    
    theta: function() {
      return 360 / this.get('parentView.content.length')
    }.property('parentView.content.length'),
    
    rotation: function() {
      console.log(this.get('contentIndex'), this.get('theta'))
      
      return this.get('theta') * this.get('contentIndex')
    }.property('theta', 'contentIndex'),
    
    transform: function() {
      this.$().css('WebkitTransform', 'rotateY(' + this.get('rotation') + 'deg) translateZ(' + this.get('radius') + 'px)')
      console.log('fired figurine')
    }.observes('parentView.content.length', 'contentIndex').property('$', 'rotation', 'radius'),
    
    didInsertElement: function() {
      this.get('transform')
    }
  })
});
