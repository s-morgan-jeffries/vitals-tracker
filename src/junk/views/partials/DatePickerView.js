define([
  '../../../bower_components/underscore/underscore',
  'moment',
  'InputView'
], function (_, moment, InputView) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.initialize = function () {
    this.$el.datetimepicker({
      pickDate: true,
      pickTime: false
    });
    InputView.prototype.initialize.apply(this, arguments);
  };

  // Override the parent getter
  protoProps.get = function () {
    var datePicker = this.$el.data('DateTimePicker'),
      modelDate = moment(this.model.get(this.name)),
      pickerDate = datePicker.getDate() || moment(NaN);
    modelDate.month(pickerDate.month());
    modelDate.date(pickerDate.date());
    modelDate.year(pickerDate.year());
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
