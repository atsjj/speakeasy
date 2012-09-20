Speakeasy.DrinksView = Ember.View.extend({
  templateName: 'drinks',
  
  willInsertElement: function() {
    var width = 240;
    var count = this.get('context.namespace.router.drinksController.content.length') * 3;
    var theta = 360 / count;
    var radius = (width / 2) / Math.tan(Math.PI / count);
    
    var css_vars = "@width: " + width + "px; @ents: " + count + "; @theta: " + theta + "deg; @radius: " + radius + "px;";
    var css_ents = "";
    for(var i=1; i<=count; i++) {
      css_ents += "li.figurine:nth-child(" + i + ") { -webkit-transform: rotateY(@theta * "+i+") translateZ(@radius); }"
    }
    
    css_vars += css_ents;
    var parser = new(less.Parser)({ filename: 'figurine.less' });
    parser.parse(css_vars, function(err, tree) { console.log(tree.toCSS()); $('body').append($("<style></style>").attr('rel', 'stylesheet/less').attr('type', 'text/css').text(tree.toCSS())); });
    
    return true;
  },
  
  didInsertElement: function() {
  
  }
});
