/* ==========================================================
 * bootstrap-3d-carousel.js v0.1
 * ==========================================================
 * Rewritten for jQuery and Bootstrap by Steven Jabour, 2012
 *
 * Original 3D Carousel by David DeSandro
 * http://desandro.github.com/3dtransforms
 * ========================================================== */

!function ($) {

  "use strict"; // jshint ;_;

 /* 3D CAROUSEL CLASS DEFINITION
  * ============================ */

  var D3Carousel = function (element, options) {
    this.$element = $(element);
    this.options = options;
    this.angularize();
    this.options.d3Slide && this.slide(this.options.d3Slide);
  }

  D3Carousel.prototype = {
    offset: 0,
    increment: 0,
    
    radius: function() {
      return (this.$element[0].offsetWidth / 2) / Math.tan(Math.PI / this.panels().length);
    },
    
    theta: function() {
      return (360 / this.panels().length);
    },
    
    rotation: function() {
      this.offset += this.theta() * this.increment * -1;
      this.offset = Math.round(this.offset / this.theta()) * this.theta();
      
      return this.offset;
    },
    
    panels: function() {
      return this.$element.children().not("script")
    },
    
    angularize: function() {      
      var $panels = this.panels();
      
      for(var i = 0; i < $panels.length; i++) {
        $($panels[i]).css('WebkitTransform', 'rotateY('+(this.theta() * i)+'deg) translateZ('+this.radius()+'px)');
      }
      
      this.organize();
      
      return this;
    },
    
    organize: function() {
      this.$element.css('WebkitTransform', 'translateZ(-'+this.radius()+'px) rotateY('+this.rotation()+'deg)')
      
      return this;
    },
    
    next: function() {
      return this.slide('next');
    },
    
    prev: function() {
      return this.slide('prev');
    },
    
    slide: function(type) {
      this.increment = (type=='next') ? 1 : -1;
      this.angularize();
      
      return this;
    }
  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  $.fn.d3carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('D3Carousel')
        , options = $.extend({}, $.fn.d3carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.d3Slide
      if (!data) $this.data('D3Carousel', (data = new D3Carousel(this, options)))
      if(action) data[action]();
    })
  }

  $.fn.d3carousel.defaults = {
  }

  $.fn.d3carousel.Constructor = D3Carousel
  
  /* CAROUSEL DATA-API
   * ================= */

  $(function () {
    $('body').on('click.D3Carousel.data-api', '[data-d3-slide]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , options = !$target.data('modal') && $.extend({}, $target.data(), $this.data())
      $target.d3carousel(options)
      e.preventDefault()
    })
  })
}(window.jQuery);