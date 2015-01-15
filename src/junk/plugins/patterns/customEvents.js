define([
  'module_interfaces/jqueryCore'
], function ($) {
  'use strict';

  $.widget('ao.eventStatus', {
    options: {

    },

    _create : function() {
      var self = this;

      //self.element.addClass( 'my-widget' );

      //subscribe to 'myEventStart'
      self.element.bind( 'myEventStart', function( e ) {
        console.log(e);
        console.log('event start');
      });

      //subscribe to 'myEventEnd'
      self.element.bind( 'myEventEnd', function( e ) {
        console.log(e);
        console.log('event end');
      });

      //unsubscribe to 'myEventStart'
      //self.element.unbind( 'myEventStart', function(e){
      ///console.log('unsubscribed to this event');
      //});
    }

    //destroy: function(){
    //  $.Widget.prototype.destroy.apply( this, arguments );
    //}

  });

  return $;
});
