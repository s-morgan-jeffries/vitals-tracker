define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'Measurement',
  'InputViewOrig',
  'DatePickerViewOrig',
  'TimePickerViewOrig'
], function ($, _, Backbone, templates, Measurement, InputView, DatePickerView, TimePickerView) {
  'use strict';

  var ENTER_KEY = 13;

  var instanceProps = {},
    staticProps = {};

  instanceProps.tagName = 'tr';

  // This is the way templates have to work when you're working with Marionette
  instanceProps.template = function (serializedModel) {
    return templates.MeasurementEdit(serializedModel);
  };

  instanceProps.initialize = function () {
    // Make the model
    //console.log(this.model);
    // jshint expr: true
    this.model || (this.model = new Measurement());
    // jshint expr: false
    // Create an array for storing the subViews (used later to close them)
    this.subViews = [];
    this.netFocus = 0;
    //this.$el.on('blur', function () {
    //  console.log('blur:MeasurementEditView');
    //});

    // Make sure child views are re-created/rendered when the view is re-rendered
    //this.on('render', this.createSubViews, this);
    //this.render();

    //this.createSubViews();
  };

  instanceProps.onRender = function () {
    this.createSubViews();
  };

  instanceProps.createSubViews = function () {
    // Get rid of the old child views if they exist
    this.destroySubViews();
    // Create the child views
    // Capture the current context
    var measurementEditView = this,
      // Get a reference to the model
      model = this.model,
    // Set up events for the child views
      inputEvents = {};

    // Update the model on blur
    inputEvents.blur = 'updateModel';
    // Update and save when the `Enter` key is pressed
    inputEvents.keydown = function (e) {
      // If it's not the `Enter` key, return now
      if (e.which !== ENTER_KEY) {
        return;
      }
      //console.log('pressed enter');

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
      inputView.updateModel();
    };

    this.$('input').each(function () {
      var Constructor,
        viewInstance,
        $this = $(this),
        isDate = $this.data('picker') === 'date',
        isTime = $this.data('picker') === 'time',
        name;
      if (isDate) {
        Constructor = DatePickerView;
        name = 'date';
      } else if (isTime) {
        Constructor = TimePickerView;
        name = 'time';
      } else {
        Constructor = InputView;
      }
      viewInstance = new Constructor({el: this, model: model, events: inputEvents});
      measurementEditView['$' + (name || viewInstance.name)] = viewInstance;
      measurementEditView.subViews.push(viewInstance);
    });
  };

  instanceProps.destroySubViews = function () {
    while (this.subViews.length) {
      this.subViews.pop().close();
    }
  };

  instanceProps.publishUpdates = function () {
    this.trigger('modelUpdated', this.model, this);
  };

  instanceProps.reset = function () {
    this.model.reset();
  };

  instanceProps.newModel = function () {
    if (this.model) {
      this.stopListening(this.model);
    }
    this.destroySubViews();
    this.model = new Measurement();
    this.createSubViews();
  };

  // Logic for closing the view
  instanceProps.close = function () {
    // Remove any event listeners
    this.off();
    // Stop listening to any external events
    this.stopListening();
    // Close all the child views
    this.destroySubViews();
    // Remove from the DOM
    this.remove();
  };

  instanceProps.triggerFocusLost = function () {
    if (this.netFocus === 0) {
      this.trigger('focuslost:MeasurementEditView');
      console.log('focuslost:MeasurementEditView');
    }
  };

  instanceProps.events = {
    focusout: function () {
      this.netFocus -= 1;
      setTimeout(this.triggerFocusLost.bind(this), 0);
    },
    focusin: function () {
      this.netFocus += 1;
    }
  };

  return Backbone.Marionette.ItemView.extend(instanceProps, staticProps);
});
