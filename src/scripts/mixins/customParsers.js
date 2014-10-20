define(['moment'], function (/*moment*/) {
  'use strict';

  var customParsers = {};

  // Datetime
  customParsers.parseDatetimeInput = function (valueStr) {
    return new Date(valueStr);
  };
  // Will return undefined for an empty string, NaN for a string that can't be converted to a number, and a number
  // otherwise. At least in Chrome, this
  customParsers.parseNumberInput = function (valueStr, validity) {
    // If there's a validity object and this is a badInput
    if (validity && validity.badInput) {
      return NaN;
    }
    return valueStr.length ? +valueStr : void 0;
  };

  customParsers.parseTextInput = function (valueStr) {
    return valueStr;
  };

  return customParsers;
});