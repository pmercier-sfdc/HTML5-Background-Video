/*
* Zepto/jQuery Background video plugin
* ---
* Copyright 2013, Pascal Mercier (salesforce.com) 
* Inspired/Built based on Victor Coulon's JQuery plugin
* (http://victorcoulon.fr)
*/

(function($) {

  $.backgroundVideo = function(el, options) {
    
    var defaults = {
      videoid: "video_background",
      position: "fixed"
    }
    
    var plugin = this;
    
    plugin.settings = {}
    
    var init = function() {
      plugin.settings = $.extend({}, defaults, options);
      plugin.el = el;
      
      buildVideo();
    }
    
    var buildVideo = function () {
      var html = '';
      html += '<video id="'+plugin.settings.videoid+'" preload="auto" autoplay="autoplay" loop="true"';
      html += 'style="display:none;position:'+plugin.settings.position+';top:0;left:0;bottom:0;right:0;width:100%;height:100%;">';                                                              
      for(var i=0; i < plugin.settings.types.length; i++) {
        html += '<source src="'+plugin.settings.path+plugin.settings.filename+'.'+plugin.settings.types[i]+'" type="video/'+plugin.settings.types[i]+'" />';
      }
      html += 'bgvideo</video>';
      plugin.el.prepend(html);
      $('#' + plugin.settings.videoid).show();
      setProportion();
    }
    
    var setProportion = function () {
      var proportion = getProportion();
      console.log('original width/height: ' + plugin.settings.width + " / " + plugin.settings.height);
      console.log($('#' + plugin.settings.videoid));
      $('#' + plugin.settings.videoid).width(proportion * plugin.settings.width);
      $('#' + plugin.settings.videoid).height(proportion * plugin.settings.height);
      
      console.log('video width/height: ' + $('#' + plugin.settings.videoid).width() + " / " + $('#' + plugin.settings.videoid).height());
      
      if (typeof plugin.settings.align !== 'undefined') {
        centerVideo();
      }
    }
    
    var getProportion = function () {
      console.log('video container width/height: ' + plugin.el.width() + " / " + plugin.el.height());
      var viewportWidth = plugin.el.width();
      var viewportHeight = plugin.el.height();
      var viewportProportion = viewportWidth / viewportHeight;
      var origProportion = plugin.settings.width / plugin.settings.height;
      var proportion = viewportHeight / plugin.settings.height;
      
      if (viewportProportion >= origProportion) {
        proportion = viewportWidth / plugin.settings.width;
      }
      
      console.log('proportion: ' + proportion);
      return proportion;
    }
    
    var centerVideo = function() {
      var centerX = ((plugin.el.width() >> 1) - ($('#' + plugin.settings.videoid).width() >> 1)) | 0;
      var centerY = ((plugin.el.height() >> 1) - ($('#' + plugin.settings.videoid).height() >> 1)) | 0;

      if (plugin.settings.align == 'centerXY') {
        $('#' + plugin.settings.videoid).css({ 'left': centerX, 'top': centerY });
        return;
      }

      if (plugin.settings.align == 'centerX') {
       $('#' + plugin.settings.videoid).css('left', centerX);
        return;
      }

      if (plugin.settings.align == 'centerY') {
        $('#' + plugin.settings.videoid).css('top', centerY);
        return;
      }
    }
    
    init();
    
    $(window).resize(function() { 
    	setProportion();
    });
    $('#' + plugin.settings.videoid).bind('ended', function(){ this.play(); });
  }
})(Zepto || jQuery);
