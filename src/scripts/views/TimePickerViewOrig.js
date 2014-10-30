define([
  'underscore',
  'moment',
  'InputViewOrig'
], function (_, moment, InputView) {
  'use strict';

  var instanceProps = {},
    staticProps = {};

  instanceProps.initialize = function () {
    // The name, which tells you what to update
    this.name = this.$el.attr('name');
    // Configures the view to update its value when the model is reset
    this.listenTo(this.model, 'modelReset', this.updateView);
    // Set up the datetimepicker
    this.$el.datetimepicker({
      pickDate: false,
      pickTime: true
    });
    // Initialize the input's value with whatever's in the model
    this.updateView();
  };

  // Override the getter
  instanceProps.get = function () {
    var datePicker = this.$el.data('DateTimePicker'),
      modelDate = _.clone(this.model.get(this.name)),
      pickerDate = datePicker.getDate() || moment(NaN);
    modelDate.hour(pickerDate.hour());
    modelDate.minute(pickerDate.minute());
    modelDate.second(pickerDate.second());
    return modelDate;
  };

  // A generic setter (can be overridden for Views that inherit from this one)
  instanceProps.set = function (value) {
    var datePicker = this.$el.data('DateTimePicker');
    datePicker.setDate(moment(new Date(value)));
  };

  //// A generic close method (can be overridden for Views that inherit from this one)
  //instanceProps.close = function () {
  //  // Don't remove this from the DOM.
  //  this.off();
  //  this.stopListening();
  //};

  return InputView.extend(instanceProps, staticProps);
});
