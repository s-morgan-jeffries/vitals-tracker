define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  'use strict';

  var updateValidEvent = 'updateValid',
    updateInvalidEvent = 'updateInvalid',
    viewProps = {};

  viewProps.initialize = function () {
    // The name, which tells you what to update
    this.name = this.$el.attr('name');
    // Cache the sanitizer function
    this.parser = this.getParser();
//    this.on('foo', function () {});
//    this.listenTo(this.model, 'bar', function () {});
  };

  viewProps.close = function () {
    // Don't remove this from the DOM.
    this.off();
    this.stopListening();
  };

  viewProps.update = function () {
    var newVal = this.value(),
      oldVal = this.model.get(this.name),
      changeEvent = 'change:' + this.name,
      invalidEvent = 'invalid',
      updateAttrs = {};

    // Now we'll build our event handlers, `onChange` and `onInvalid`. The context for both of these will be the view.
    var onChange = function () {
      console.log('onChange');
      // Detach handler for change event
      this.stopListening(this.model, changeEvent, onChange);
      // Detach handler for invalid event
      this.stopListening(this.model, invalidEvent, onInvalid);
      // Set the value to whatever we got by sanitizing the raw value
//      this.$el.val(newVal);
      // Trigger an event indicating that the update worked
      this.trigger(updateValidEvent);
    };

    var onInvalid = function () {
      console.log('onInvalid');
      // Detach handler for change event
      this.stopListening(this.model, changeEvent, onChange);
      // Detach handler for invalid event
      this.stopListening(this.model, invalidEvent, onInvalid);
      // Revert to the old value
      this.$el.val(oldVal);
      // Trigger an event indicating that the update didn't work
      this.trigger(updateInvalidEvent);
    };

    if (newVal === oldVal) {
      this.$el.val(oldVal);
    } else {
      // If we've made it this far, we're going to try to update the model. The only way this won't work is if the
      // updated value fails validation. First, we'll set up the attributes hash.
      updateAttrs[this.name] = newVal;

      // Now attach the handlers. We should have guaranteed by this point that one of these two will happen, so these
      // handlers will get detached.
      this.listenTo(this.model, changeEvent, onChange);
      this.listenTo(this.model, invalidEvent, onInvalid);

      // Now we update the model (with the validate option set to true) and let our event handlers do the rest.
      if (_.isUndefined(newVal)) {
        // If newVal is undefined, we're unsetting the attribute. We're using the `set` method with `unset` set to true
        // so that we can still use validation. That way, trying to unset required attributes will trigger an `invalid`
        // event.
        this.model.set(updateAttrs, {validate: true, unset: true});
      } else {
        this.model.set(updateAttrs, {validate: true});
      }
    }
  };

  // Wrapper around jQuery.prototype.val that coerces the string to an appropriate type
  viewProps.value = function () {
    return this.parser(this.el.value, this.el.validity);
  };

  viewProps.getParser = function () {
    var type = this.$el.attr('type'),
      parser = this[this.$el.data('parser')] || this[_.str.camelize('parse-' + type + '-input')];
    return _.isFunction(parser) ? parser : this.parseTextInput;
  };

  return Backbone.View.extend(viewProps);
});