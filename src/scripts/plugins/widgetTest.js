define([
  'module_interfaces/jqueryCore'
], function ($) {
  'use strict';

  $.widget( 'custom2.progressbar', {
    options: {
      value: 0
    },
    // Sort of like the initialize method for Backbone. By this point, options and element have already been set.
    _create: function() {
      //var completeEvent = this.widgetEventPrefix + 'complete';
      this.options.value = this._constrain(this.options.value);
      this.element.addClass( 'progressbar' );
      this.refresh();
    },
    // Special named method used for setting and getting single options as key/value pairs. The option method will
    // figure out whether to use this or _setOptions.
    _setOption: function( key, value ) {
      if ( key === 'value' ) {
        value = this._constrain( value );
      }
      // _super calls the method of the same name on the parent widget. This is possible because the $.widget factory
      // method iterates over the prototype to create a proxied prototype, and in building the proxied prototype, it
      // obviously has access to the property names.
      this._super( key, value );
    },
    // Special named method used for setting multiple options at once.
    _setOptions: function( options ) {
      this._super( options );
      this.refresh();
    },
    refresh: function() {
      console.log('custom2.progressbar refresh');
      var progress = this.options.value + '%';
      this.element.text( progress );
      if ( this.options.value === 100 ) {
        // The _trigger method is passed an event name, an Event, and data. So the trick here is that what this actually
        // does is trigger the named event *prefixed* by the widgetEventPrefix *on* the widget's associated element. So
        // a handler for this event would need to be on the element and subscribed to the `progressbarcomplete` event.
        this._trigger( 'complete', null, { value: 100 } );
      }
    },
    // Methods prefixed by an underscore are private by convention (like in Python).
    _constrain: function( value ) {
      if ( value > 100 ) {
        value = 100;
      }
      if ( value < 0 ) {
        value = 0;
      }
      return value;
    },
    on: function (eventName, handler) {
      var widgetEventPrefix = this.widgetEventPrefix,
        rawEventName = widgetEventPrefix + eventName,
        handlerObj = {};
      handlerObj[rawEventName] = handler;
      this._on(handlerObj);
    }
  });

  $.widget( 'custom.progressbar', {
    options: {
      value: 0
    },
    // Sort of like the initialize method for Backbone. By this point, options and element have already been set.
    _create: function() {
      //var completeEvent = this.widgetEventPrefix + 'complete';
      this.options.value = this._constrain(this.options.value);
      this.element.addClass( 'progressbar' );
      this.refresh();
    },
    // Special named method used for setting and getting single options as key/value pairs. The option method will
    // figure out whether to use this or _setOptions.
    _setOption: function( key, value ) {
      if ( key === 'value' ) {
        value = this._constrain( value );
      }
      // _super calls the method of the same name on the parent widget. This is possible because the $.widget factory
      // method iterates over the prototype to create a proxied prototype, and in building the proxied prototype, it
      // obviously has access to the property names.
      this._super( key, value );
    },
    // Special named method used for setting multiple options at once.
    _setOptions: function( options ) {
      this._super( options );
      this.refresh();
    },
    refresh: function() {
      console.log('custom.progressbar refresh');
      var progress = this.options.value + '%';
      this.element.text( progress );
      if ( this.options.value === 100 ) {
        // The _trigger method is passed an event name, an Event, and data. So the trick here is that what this actually
        // does is trigger the named event *prefixed* by the widgetEventPrefix *on* the widget's associated element. So
        // a handler for this event would need to be on the element and subscribed to the `progressbarcomplete` event.
        this._trigger( 'complete', null, { value: 100 } );
      }
    },
    // Methods prefixed by an underscore are private by convention (like in Python).
    _constrain: function( value ) {
      if ( value > 100 ) {
        value = 100;
      }
      if ( value < 0 ) {
        value = 0;
      }
      return value;
    },
    on: function (eventName, handler) {
      var widgetEventPrefix = this.widgetEventPrefix,
        rawEventName = widgetEventPrefix + eventName,
        handlerObj = {};
      handlerObj[rawEventName] = handler;
      this._on(handlerObj);
    }
  });

  return $;
});
