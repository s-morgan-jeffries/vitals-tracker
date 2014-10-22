define([], function () {
  'use strict';

  var customMatchers = {};

  customMatchers.toBeNaN = function (actual) {
    return isNaN(actual);
  };

  return customMatchers;
});