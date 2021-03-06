define([
  '../../bower_components/underscore/underscore',
  'moment'
], function (_, moment) {
  'use strict';

  var customValidators = {};

  var makePredicate = function (predicateFnName, predicateName) {
    return function (value, attr, expected /*, model*/) {
      if (_.isUndefined(value)) {
        return;
      }
      if (_[predicateFnName](value) !== expected) {
        return attr + ' must ' + (expected ? '' : 'not ') + 'be ' + predicateName;
      }
    };
  };

  customValidators.isBoolean = makePredicate('isBoolean', 'a boolean');

  customValidators.isDate = function (value, attr, expected /*, model*/) {
    if (_.isUndefined(value)) {
      return;
    }
    if ((_.isDate(value) || moment.isMoment(value)) !== expected) {
      return attr + ' must ' + (expected ? '' : 'not ') + 'be a date';
    }
  };

  customValidators.isValidDate = function (value, attr/*, expected, model*/) {
    if (_.isUndefined(value)) {
      return;
    }
    // Make sure it's a date
    var isDate = _.isUndefined(customValidators.isDate(value, attr, true));
    if (!isDate) {
      return attr + ' must be a date';
    }
    // Make sure it's a valid date
    if (_.isNaN(value.valueOf())) {
      return attr + ' must be a valid date';
    }
  };

  customValidators.inFuture = function (value, attr, expected/*, model*/) {
    if (_.isUndefined(value)) {
      return;
    }

    var now = new Date(),
      isInFuture = (value - now) > 0;

    if (isInFuture !== expected) {
      return attr + ' must ' + (expected ? '' : 'not ') + 'be in the future';
    }
  };

  customValidators.isNaN = makePredicate('isNaN', 'NaN');

  customValidators.isNull = makePredicate('isNull', 'null');

  customValidators.isNumber = makePredicate('isNumber', 'a number');

  customValidators.isString = makePredicate('isString', 'a string');

  customValidators.gtAttr = function (value, attr, otherAttr, model, computed) {
    if (value <= computed[otherAttr]) {
      return attr + ' must be greater than ' + otherAttr;
    }
  };

  customValidators.gteAttr = function (value, attr, otherAttr, model, computed) {
    if (value < computed[otherAttr]) {
      return attr + ' must be greater than or equal to ' + otherAttr;
    }
  };

  customValidators.ltAttr = function (value, attr, otherAttr, model, computed) {
    if (value >= computed[otherAttr]) {
      return attr + ' must be less than ' + otherAttr;
    }
  };

  customValidators.lteAttr = function (value, attr, otherAttr, model, computed) {
    if (value > computed[otherAttr]) {
      return attr + ' must be less than or equal to ' + otherAttr;
    }
  };

  return customValidators;
});
