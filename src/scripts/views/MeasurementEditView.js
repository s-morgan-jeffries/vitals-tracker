define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'Measurement',
  'InputView',
  'DatePickerView',
  'TimePickerView'
], function ($, _, Backbone, templates, Measurement, InputView, DatePickerView, TimePickerView) {
  'use strict';

  var ENTER_KEY = 13;

  var viewProps = {};

  viewProps.tagName = 'tr';

  // This is the way templates have to work when you're working with Marionette
  viewProps.template = function (serializedModel) {
    return templates.MeasurementEdit(serializedModel);
  };

  viewProps.initialize = function () {
    // Make the model
    // jshint expr: true
    this.model || (this.model = new Measurement());
    // jshint expr: false
    this.render();

    // Create the child views
    // Capture the current context
    var measurementEditView = this;
    // Get a reference to the model
    var model = this.model;
    // Create an array for storing the childViews (used later to close them)
    this.childViews = [];

    // Set up events for the child views
    var inputEvents = {};
    // Update the model on blur
    inputEvents.blur = 'update';
    // Update and save when the `Enter` key is pressed
    inputEvents.keydown = function (e) {
      // If it's not the `Enter` key, return now
      if (e.which !== ENTER_KEY) {
        return;
      }

      // Event strings
      var updateValidEvent = 'updateValid',
        updateInvalidEvent = 'updateInvalid',
        // Reference to the child view
        inputView = this;

      // What to do when the update is valid
      var onUpdateValid = function () {
        // Unregister the handlers
        measurementEditView.stopListening(inputView, updateValidEvent, onUpdateValid);
        measurementEditView.stopListening(inputView, updateInvalidEvent, onUpdateInvalid);
        // Publish the updates that have been made to the model
        measurementEditView.publishUpdates();
      };

      // What to do when the update is invalid
      var onUpdateInvalid = function () {
        // Unregister the handlers
        measurementEditView.stopListening(inputView, updateValidEvent, onUpdateValid);
        measurementEditView.stopListening(inputView, updateInvalidEvent, onUpdateInvalid);
      };

      // Register the event handlers
      measurementEditView.listenTo(inputView, updateValidEvent, onUpdateValid);
      measurementEditView.listenTo(inputView, updateInvalidEvent, onUpdateInvalid);

      // Call the update method and let the handlers do the rest
      inputView.update();
    };

    this.$('input').each(function () {
      var Constructor,
        viewInstance,
        $this = $(this),
        isDate = $this.attr('name') === 'date',
        isTime = $this.attr('name') === 'time';
      if (isDate) {
        Constructor = DatePickerView;
      } else if (isTime) {
        Constructor = TimePickerView;
      } else {
        Constructor = InputView;
      }
      viewInstance = new Constructor({el: this, model: model, events: inputEvents});
      measurementEditView['$' + viewInstance.name] = viewInstance;
      measurementEditView.childViews.push(viewInstance);
    });
  };

  //// Logic for saving the model
  //viewProps.save = function () {
  //  var saveSuccessEvent = 'sync',
  //    saveErrorEvent = 'error',
  //    successEvent = 'modelSaved',
  //    errorEvent = 'modelSaveError';
  //
  //  // We're saving the model here. What should happen from that point depends on context, so the way to handle this is
  //  // just to trigger an event.
  //  var onSuccess = function (model, response/*, options*/) {
  //    // Unregister listeners for `sync` and `error` events
  //    this.stopListening(this.model, saveSuccessEvent, onSuccess);
  //    this.stopListening(this.model, saveErrorEvent, onError);
  //    this.trigger(successEvent, this, model, response);
  //    console.log('model saved');
  //    console.log('\tview:');
  //    console.log(this);
  //    console.log('\tmodel:');
  //    console.log(model);
  //    console.log('\tresponse:');
  //    console.log(response);
  //  };
  //
  //  var onError = function (model, response/*, options*/) {
  //    // Unregister listeners for `sync` and `error` events
  //    this.stopListening(this.model, saveSuccessEvent, onSuccess);
  //    this.stopListening(this.model, saveErrorEvent, onError);
  //    this.trigger(errorEvent, this, model, response);
  //    console.log('model save error');
  //    console.log('\tview:');
  //    console.log(this);
  //    console.log('\tmodel:');
  //    console.log(model);
  //    console.log('\tresponse:');
  //    console.log(response);
  //  };
  //
  //  // Register listeners for `sync` and `error` events
  //  this.listenTo(this.model, saveSuccessEvent, onSuccess);
  //  this.listenTo(this.model, saveErrorEvent, onError);
  //
  //  console.log('saving model');
  //  this.model.save();
  //};

  viewProps.publishUpdates = function () {
    var editCompletedEvent = 'modelUpdated';

    this.trigger(editCompletedEvent, this, this.model);
  };

  // Logic for closing the view
  viewProps.close = function () {
    // Remove any event listeners
    this.off();
    // Stop listening to any external events
    this.stopListening();
    // Close all the child views
    while (this.childViews.length) {
      this.childViews.pop().close();
    }
    // Remove from the DOM
    this.remove();
  };

  return Backbone.Marionette.ItemView.extend(viewProps);
});
