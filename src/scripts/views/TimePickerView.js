define([
  'underscore',
  'moment',
  'InputView'
], function (_, moment, InputView) {
  'use strict';

  var instanceProps = {},
    staticProps = {};

  //instanceProps.initialize = function () {
  //  // The name, which tells you what to update
  //  this.name = this.$el.attr('name');
  //  // Set up the datetimepicker
  //  this.$el.datetimepicker({
  //    pickDate: true,
  //    pickTime: false
  //  });
  //};
  //
  //// Override the getter
  //instanceProps.get = function () {
  //  var datePicker = this.$el.data('DateTimePicker'),
  //    newDate = datePicker.getDate();
  //  return newDate;
  //};
  //
  //// A generic setter (can be overridden for Views that inherit from this one)
  //instanceProps.set = function (value) {
  //  var datePicker = this.$el.data('DateTimePicker');
  //  datePicker.setDate(value);
  //};
  //
  //// A generic close method (can be overridden for Views that inherit from this one)
  //instanceProps.close = function () {
  //  // Don't remove this from the DOM.
  //  this.off();
  //  this.stopListening();
  //};

  return InputView.extend(instanceProps, staticProps);
});
