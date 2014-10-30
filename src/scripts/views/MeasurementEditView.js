//var evt;
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

  var protoProps = {},
    staticProps = {};

  protoProps.tagName = 'tr';

  // This is the way templates have to work when you're working with Marionette
  protoProps.template = function (serializedModel) {
    return templates.MeasurementEdit(serializedModel);
  };

  protoProps.initialize = function () {
    // Make the model
    if (this.model) {
      console.log('has a model');
      this.initialAttrs = this.model.toJSON();
    } else {
      console.log('no model');
      this.model = new Measurement();
    }
    // Create an object for storing InputView instances (used to access them by name)
    this.inputViews = {};
    // Create an array for storing the subViews (used later to close them)
    this.subViews = [];
  };

  protoProps.onRender = function () {
    this.createSubViews();
  };

  protoProps.updateModelAttr = function (e) {
    var $input = $(e.target),
      viewName = $input.data('viewName'),
      inputView = this.inputViews[viewName];
    inputView.updateModel();
  };

  protoProps.submitOnEnter = function (e) {
    if (e.which !== ENTER_KEY) {
      return;
    }

    // submission logic
    var $input = $(e.target),
      viewName = $input.data('viewName'),
      inputView = this.inputViews[viewName],
      updateEvent = inputView.name + ':update',
      successStatuses = ['success', 'nochange'];
    this.listenToOnce(inputView, updateEvent, function (data) {
      if (_.contains(successStatuses, data.status)) {
        this.submitModel();
      }
    });
    inputView.updateModel();
  };

  protoProps.createSubViews = function () {
    //// Capture the current context
    var measurementEditView = this,
    // Get a reference to the model
      model = this.model;

    this.$('input').each(function () {
      var Constructor,
        viewInstance,
        $this = $(this),
        isDate = $this.data('picker') === 'date',
        isTime = $this.data('picker') === 'time',
        viewName;
      if (isDate) {
        Constructor = DatePickerView;
        viewName = 'date';
      } else if (isTime) {
        Constructor = TimePickerView;
        viewName = 'time';
      } else {
        Constructor = InputView;
      }
      viewInstance = new Constructor({el: this, model: model});
      // This has to be available on the element so we can get it from events on that element
      viewName = viewInstance.$el.data('viewName');
      // So we can find the inputView by name
      measurementEditView.inputViews[viewName] = viewInstance;
      // So we can destroy the inputView when the measurementEditView is destroyed
      measurementEditView.subViews.push(viewInstance);
    });
  };

  protoProps.onBeforeDestroy = function () {
    this.destroySubViews();
  };

  protoProps.destroySubViews = function () {
    while (this.subViews.length) {
      this.subViews.pop().destroy();
    }
  };

  protoProps.submitModel = function () {
    console.log('measurement:submit');
    this.trigger('measurement:submit', this.model, this);
  };

  protoProps.reset = function () {
    this.model.reset(this.initialAttrs);
    this.updateInputViews();
  };

  protoProps.updateInputViews = function () {
    _.each(this.inputViews, function (inputView) {
      inputView.updateView();
    });
  };

  //protoProps.triggerFocusLost = function () {
  //  if (this.netFocus === 0) {
  //    this.trigger('focuslost:MeasurementEditView');
  //    console.log('focuslost:MeasurementEditView');
  //  }
  //};

  protoProps.events = {
    'blur input': 'updateModelAttr',
    'keydown input': 'submitOnEnter'
    //focusout: function () {
    //  this.netFocus -= 1;
    //  setTimeout(this.triggerFocusLost.bind(this), 0);
    //},
    //focusin: function () {
    //  this.netFocus += 1;
    //}
  };

  return Backbone.Marionette.ItemView.extend(protoProps, staticProps);
});
