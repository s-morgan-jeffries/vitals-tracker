define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var instanceProps = {},
    staticProps = {};

  instanceProps.initialize = function () {
    // The name, which tells you what to update
    this.name = this.$el.attr('name');
    // Configures the view to update its value when the model is reset
    this.listenTo(this.model, 'modelReset', this.updateView);
    // Initialize the input's value with whatever's in the model
    this.updateView();
  };

  // A generic getter (can be overridden for Views that inherit from this one)
  instanceProps.get = function () {
    return this.parse(this.el.value, this.el.validity);
  };

  // A generic setter (can be overridden for Views that inherit from this one)
  instanceProps.set = function (value) {
    this.$el.val(value);
  };

  // A generic close method (can be overridden for Views that inherit from this one)
  instanceProps.close = function () {
    // Don't remove this from the DOM.
    this.off();
    this.stopListening();
  };

  // Method for updating the named attribute of the model for this view. You shouldn't have to rewrite this for Views
  // that inherit from this one.
  instanceProps.updateModel = function () {
    var newVal = this.get(),
      oldVal = this.model.get(this.name),
      changeEvent = 'change:' + this.name,
      invalidEvent = 'invalid',
      updateValidEvent = 'updateValid',
      updateInvalidEvent = 'updateInvalid',
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
      this.set(oldVal);
      // Trigger an event indicating that the update didn't work
      this.trigger(updateInvalidEvent);
    };

    // First, check if the new value is the same as the old value. If it is, reset the value in the input to the value
    // from the model and trigger the `updateValid` event.
    if (newVal === oldVal) {
      this.set(oldVal);
      this.trigger(updateValidEvent);
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

  // A method for updating this input's value from the named attribute of its model
  instanceProps.updateView = function () {
    this.set(this.model.get(this.name));
  };

  // Utility method for getting the parser
  instanceProps.getParser = function () {
    var type = this.$el.attr('type'),
      parser = this[this.$el.data('parser')] || this[_.str.camelize('parse-' + type + '-input')];
    return _.isFunction(parser) ? parser : this.parseTextInput;
  };

  // Method for parsing raw string values
  instanceProps.parse = function (value, validity) {
    // jshint expr: true
    this._parser || (this._parser = this.getParser());
    // jshint expr: false
    return this._parser(value, validity);
  };

  return Backbone.View.extend(instanceProps, staticProps);
});
