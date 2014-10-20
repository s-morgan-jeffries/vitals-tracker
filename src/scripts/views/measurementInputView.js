//var vitals;

define([
  'underscore',
  'backbone',
  'jquery',
//  'moment',
  'templates',
  'vitalsMeasurement',
  'bootstrap'
], function (_, Backbone, $, templates, VitalsMeasurement) {
  'use strict';

  var measurementInputViewProps = {};

  var ENTER_KEY = 13;
  var updateValidEvent = 'updateValid';
  var updateInvalidEvent = 'updateInvalid';

  measurementInputViewProps.tagName = 'tr';
  measurementInputViewProps.template = templates.measurementInputTemplate;

  measurementInputViewProps.initialize = function (/*options*/) {

    // Add the collection
//    this.collection = options.collection;

    // Set up the model
    this.model = new VitalsMeasurement();
    // Render the template so we can start attaching handlers
    this.render();

    // Application channel
//    this.appChannel = Backbone.Wreqr.radio.channel('vitalsApp');
    this.eventBus = Backbone.Wreqr.radio.channel('vitalsApp').vent;

    // Set up date and time inputs
    // Cache the date input
    this.$dateInput = this.$('.date-input');
    // Call the datetimepicker plugin
    this.$dateInput.datetimepicker({
      pickDate: true,
      pickTime: false
    });
    // Cache the time input
    this.$timeInput = this.$('.time-input');
    // Call the datetimepicker plugin
    this.$timeInput.datetimepicker({
      pickDate: false,
      pickTime: true
    });
    // Set up a handler for the `change:measuredAt` event to handle setting the date and time
    var onMeasuredAtChange = function () {
      var datePicker = this.$dateInput.data('DateTimePicker'),
        timePicker = this.$timeInput.data('DateTimePicker'),
        measuredAt = this.model.get('measuredAt');
      if (measuredAt) {
        datePicker.setDate(measuredAt.clone().startOf('day'));
        timePicker.setDate(measuredAt.clone());
      } else {
        datePicker.setDate();
        timePicker.setDate();
      }
    };
    // Call it once to set the value
    onMeasuredAtChange.call(this);
    // Set up a listener for the `change:measuredAt` event to handle setting the date
    this.listenTo(this.model, 'change:measuredAt', onMeasuredAtChange);

    // Set up the inputs for all the measured values
    var measurementNames = ['temperature', 'pulse', 'sbp', 'dbp', 'respirations', 'saturation'];
    var self = this;
    _.each(measurementNames, function (measurementName) {
      var inputName = '$' + measurementName + 'Input',
        inputSelector = '.' + measurementName + '-input',
        changeEvent = 'change:' + measurementName;

      // Cache the input element
      self[inputName] = self.$(inputSelector);

      // Register a handler for change events on the model
      self.listenTo(self.model, changeEvent, function () {
        this[inputName].val(this.model.get(measurementName));
      });
    });
  };

  measurementInputViewProps.render = function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  };

  // Utility function generator
  var updateMeasurement = function (measurementName) {

    return function () {
      // Get the new value and coerce it to numerical type
      var $input = this['$' + measurementName + 'Input'],
        newVal = $input.val(),
        oldVal = this.model.get(measurementName),
        updateAttrs = {};

      // Here we just need a simple test to make sure we've got a valid numeric value. We know we're dealing with a
      // string.
      // The string is empty (length 0) - set the value to null
      if (!newVal.length) {
        newVal = null;
      } else {
        // Otherwise, cast it to a number
        newVal = +newVal;
        // If it can't be cast to a valid number, revert to the old value
        if (_.isNaN(newVal)) {
          $input.val(oldVal);
          // Trigger an event indicating that the update didn't work
          this.trigger(updateInvalidEvent);
          return;
        }
      }

      // If we've made it this far, we have a valid numeric value (or null). We could try to set it here and rely on
      // events to tell us what to do next, but there's a problem there. Setting could result in one of three outcomes:
      // 1) The model changes
      // 2) The new value is invalid
      // 3) The new value is valid, but it's the same as the old value, so the model doesn't change.
      // To deal with the first two cases, we could attach handlers to both events and then detach them once either
      // event occurs. Unfortunately, in the third case, there won't be an event, so there won't be anything to tell us
      // to detach our handlers. We need to plan around that. If we eliminate the third possibility by first comparing
      // our new value to the old one, we can then use events to deal with the other two.
      if (newVal === oldVal) {
        // Trigger an event indicating that the update worked (or would have)
        this.trigger(updateValidEvent);
        return;
      }

      // If we've made it this far, we're going to try to update the model. The only way this won't work is if the
      // updated value fails validation. First, we'll set up the attributes hash.
      updateAttrs[measurementName] = newVal;

      // Name our events
      var changeEvent = 'change:' + measurementName;
      var invalidEvent = 'invalid';

      // Now we'll build our event handlers, `onChange` and `onInvalid`. The context for both of these will be the view.
      var onChange = function () {
        // Detach handler for change event
        this.stopListening(this.model, changeEvent, onChange);
        // Detach handler for invalid event
        this.stopListening(this.model, invalidEvent, onInvalid);
        // Trigger an event indicating that the update worked
        this.trigger(updateValidEvent);
      };

      var onInvalid = function () {
        // Detach handler for change event
        this.stopListening(this.model, changeEvent, onChange);
        // Detach handler for invalid event
        this.stopListening(this.model, invalidEvent, onInvalid);
        // Revert to the old value
        $input.val(oldVal);
        // Trigger an event indicating that the update didn't work
        this.trigger(updateInvalidEvent);
      };

      // Now attach the handlers. We should have guaranteed by this point that one of these two will happen, so these
      // handlers will get detached.
      this.listenTo(this.model, changeEvent, onChange);
      this.listenTo(this.model, invalidEvent, onInvalid);

      // Now we update the model (with the validate option set to true) and let our event handlers do the rest.
      this.model.set(updateAttrs, {validate: true});
    };

  };

  // Now make the individual update methods
  measurementInputViewProps.updateTemperature = updateMeasurement('temperature');
  measurementInputViewProps.updatePulse = updateMeasurement('pulse');
  measurementInputViewProps.updateSbp = updateMeasurement('sbp');
  measurementInputViewProps.updateDbp = updateMeasurement('dbp');
  measurementInputViewProps.updateRespirations = updateMeasurement('respirations');
  measurementInputViewProps.updateSaturation = updateMeasurement('saturation');

  // Date and time need special handling
  measurementInputViewProps.updateDate = function () {
    // Get the picker
    var picker = this.$dateInput.data('DateTimePicker'),
      // Get the old date value (we'll revert to this if there's a problem)
      oldDate = this.model.get('measuredAt').startOf('day'),
      // Get a copy of the old date that we can update with the new values
      newDate = this.model.get('measuredAt'),
      // A hash for storing update values
      updateAttrs = {};

    // Check to make sure we can parse this date
    if (_.isNull(picker.getDate())) {
      // Revert to the old value
      picker.setDate(oldDate.toDate());
      // Trigger an event indicating that the update didn't work
      this.trigger(updateInvalidEvent);
      // Don't execute the rest of the function
      return;
    }

    // Update the date values
    newDate.month(picker.getDate().month());
    newDate.date(picker.getDate().date());
    newDate.year(picker.getDate().year());

    // Now set the measuredAt property of the hash
    updateAttrs.measuredAt = newDate.toDate();

    // Name our events (one of these will be emitted by the model)
    var changeEvent = 'change:measuredAt';
    var invalidEvent = 'invalid';

    // Now we'll build our event handlers, `onChange` and `onInvalid`. The context for both of these will be the view.
    var onChange = function () {
      // Detach handler for change event
      this.stopListening(this.model, changeEvent, onChange);
      // Detach handler for invalid event
      this.stopListening(this.model, invalidEvent, onInvalid);
      // Trigger an event indicating that the update worked
      this.trigger(updateValidEvent);
    };

    var onInvalid = function () {
      // Detach handler for change event
      this.stopListening(this.model, changeEvent, onChange);
      // Detach handler for invalid event
      this.stopListening(this.model, invalidEvent, onInvalid);
      // Revert to the old value
      picker.setDate(oldDate.toDate());
      // Trigger an event indicating that the update didn't work
      this.trigger(updateInvalidEvent);
    };

    // Now attach the handlers. We should have guaranteed by this point that one of these two will happen, so these
    // handlers will get detached.
    this.listenTo(this.model, changeEvent, onChange);
    this.listenTo(this.model, invalidEvent, onInvalid);

    // Now set the value on the model and let the handlers do the rest
    this.model.set(updateAttrs, {validate: true});
  };

  measurementInputViewProps.updateTime = function () {
    // Get the picker
    var picker = this.$timeInput.data('DateTimePicker'),
      // Get the old date value (we'll revert to this if there's a problem)
      oldDate = this.model.get('measuredAt'),
      // Get a copy of the old date that we can update with the new values
      newDate = this.model.get('measuredAt'),
      // A hash for storing update values
      updateAttrs = {};

    // Check to make sure we can parse this date
    if (_.isNull(picker.getDate())) {
      // Revert to the old value
      picker.setDate(oldDate.toDate());
      // Trigger an event indicating that the update didn't work
      this.trigger(updateInvalidEvent);
      // Don't execute the rest of the function
      return;
    }

    // Update the date values
    newDate.hour(picker.getDate().hour());
    newDate.minute(picker.getDate().minute());

    // Now set the measuredAt property of the hash
    updateAttrs.measuredAt = newDate.toDate();

    // Name our events (one of these will be emitted by the model)
    var changeEvent = 'change:measuredAt';
    var invalidEvent = 'invalid';

    // Now we'll build our event handlers, `onChange` and `onInvalid`. The context for both of these will be the view.
    var onChange = function () {
      // Detach handler for change event
      this.stopListening(this.model, changeEvent, onChange);
      // Detach handler for invalid event
      this.stopListening(this.model, invalidEvent, onInvalid);
      // Trigger an event indicating that the update worked
      this.trigger(updateValidEvent);
    };

    var onInvalid = function () {
      // Detach handler for change event
      this.stopListening(this.model, changeEvent, onChange);
      // Detach handler for invalid event
      this.stopListening(this.model, invalidEvent, onInvalid);
      // Revert to the old value
      picker.setDate(oldDate.toDate());
      // Trigger an event indicating that the update didn't work
      this.trigger(updateInvalidEvent);
    };

    // Now attach the handlers. We should have guaranteed by this point that one of these two will happen, so these
    // handlers will get detached.
    this.listenTo(this.model, changeEvent, onChange);
    this.listenTo(this.model, invalidEvent, onInvalid);

    // Now set the value on the model and let the handlers do the rest
    this.model.set(updateAttrs, {validate: true});
  };


  // Now we need a function that will try to update the model and then, if it succeeds, will save the model.
  measurementInputViewProps.updateAndSave = function (fieldName) {

    // Each field already knows how to update itself, so we'll be reusing that logic. What we want to do is to attempt
    // an update with the current value of the field. If that succeeds, the model gets saved to our collection. If it
    // doesn't, we don't save.
    //
    // Once again, we're going to use events to deal with this. First, we'll write the handlers.

    // If the update works (or the value in the field is the same as in the model)
    var onValid = function () {
      // Detach the handler for the updateValidEvent
      this.off(updateValidEvent, onValid);
      // Detach the handler for the updateInvalidEvent
      this.off(updateInvalidEvent, onInvalid);
//      this.eventBus.once('saveMeasurement', function (model) {
//        console.log('Save this model:');
//        console.log(model);
//      });
      this.eventBus.trigger('saveMeasurement', this.model.toJSON());
      // Create a new model in our collection from the model's attributes
//      this.collection.addMeasurement(this.model.toJSON());
      // Reset the model. Because each field has a handler for change events on the model, this will also clear the
      // fields.
      this.model.clear();
    };

    // If the update doesn't work (or wouldn't have)
    var onInvalid = function () {
      this.off(updateValidEvent, onValid);
      this.off(updateInvalidEvent, onInvalid);
    };

    // Attach handlers
    this.on(updateValidEvent, onValid, this);
    this.on(updateInvalidEvent, onInvalid, this);

    if (fieldName) {
      // If a fieldName was passed in, find the associated update method and call it
      var updateMethod = 'update' + fieldName[0].toUpperCase() + fieldName.slice(1);
      this[updateMethod]();
    } else {
      // Otherwise, just trigger the event
      this.trigger(updateValidEvent);
    }
  };

  measurementInputViewProps.events = function () {
    var events = {};

    var fieldNames = ['Date', 'Time', 'Temperature', 'Pulse', 'Sbp', 'Dbp', 'Respirations', 'Saturation'];

    // Make the values update on blur
    _.each(fieldNames, function (fieldName) {
      var fieldClass = '.' + fieldName.toLowerCase() + '-input',
        eventString = 'blur ' + fieldClass,
        handlerName = 'update' + fieldName;
      events[eventString] = handlerName;
    });

    // Make the values update when the enter key is pressed
    _.each(fieldNames, function (fieldName) {
      var fieldClass = '.' + fieldName.toLowerCase() + '-input',
        eventString = 'keydown ' + fieldClass;
      events[eventString] = function (e) {
        if (e.which !== ENTER_KEY) {
          return;
        }
        this.updateAndSave(fieldName.toLowerCase());
      };
    });

    // Return the events hash
    return events;
  };

  return Backbone.View.extend(measurementInputViewProps);
});