define([
  'rickshaw'
], function (Rickshaw) {
  'use strict';

  // For the sake of parity, calling this `root`
  var root = window;

  // Now set root.Rickshaw to undefined
  root.Rickshaw = void 0;

  // And return Rickshaw
  return Rickshaw;
});
