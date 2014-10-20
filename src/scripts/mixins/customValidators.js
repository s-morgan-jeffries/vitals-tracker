define([
  'underscore',
  'moment'
], function (_, moment) {
  var customValidators = {};

  var makePredicate = function (predicateFnName, predicateName) {
    return function(value, attr, expected /*, model*/) {
      if (_[predicateFnName](value) !== expected) {
        return attr + ' must ' + (expected ? '' : 'not ') + 'be ' + predicateName;
      }
    };
  };

  customValidators.isBoolean = makePredicate('isBoolean', 'a boolean');

  customValidators.isDate = function(value, attr, expected /*, model*/) {
    if (!((_.isDate(value) === expected) || (moment.isMoment(value) === expected))) {
      return attr + ' must ' + (expected ? '' : 'not ') + 'be a date';
    }
  };

  customValidators.isNaN = makePredicate('isNaN', 'NaN');

  customValidators.isNull = makePredicate('isNull', 'null');

  customValidators.isNumber = makePredicate('isNumber', 'a number');

  customValidators.isString = makePredicate('isString', 'a string');

  customValidators.gtAttr = function(value, attr, customValue, model) {
    var other = model.get(customValue);
    if (other && value <= other) {
      return attr + ' must be greater than ' + customValue;
    }
  };

  customValidators.gteAttr = function(value, attr, customValue, model) {
    var other = model.get(customValue);
    if (other && value < other) {
      return attr + ' must be greater than or equal to ' + customValue;
    }
  };

  customValidators.ltAttr = function(value, attr, customValue, model) {
    var other = model.get(customValue);
    if (other && value >= other) {
      return attr + ' must be less than ' + customValue;
    }
  };

  customValidators.lteAttr = function(value, attr, customValue, model) {
    var other = model.get(customValue);
    if (other && value > other) {
      return attr + ' must be less than or equal to ' + customValue;
    }
  };

  return customValidators;
});