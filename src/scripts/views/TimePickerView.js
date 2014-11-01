define([
  'underscore',
  'moment',
  'InputView'
], function (_, moment, InputView) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.initialize = function () {
    // Set up the datetimepicker
    this.$el.datetimepicker({
      pickDate: false,
      pickTime: true
    });
    // Call the parent method
    InputView.prototype.initialize.apply(this, arguments);
  };

  // Override the parent getter
  protoProps.get = function () {
    var datePicker = this.$el.data('DateTimePicker'),
      modelDate = moment(this.model.get(this.name)),
      pickerDate = datePicker.getDate() || moment(NaN);
    modelDate.hour(pickerDate.hour());
    modelDate.minute(pickerDate.minute());
    modelDate.second(pickerDate.second());
    return modelDate.toDate();
  };

  // Override the parent setter
  protoProps.set = function (value) {
    var datePicker = this.$el.data('DateTimePicker');
    datePicker.setDate(moment(new Date(value)));
  };

  // Not yet implemented
  protoProps.onDestroy = function () {};

  return InputView.extend(protoProps, staticProps);
});
