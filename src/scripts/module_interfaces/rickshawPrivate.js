define([
  'rickshaw',
  'module_interfaces/rickshaw/RickshawGraph'
], function (Rickshaw, RickshawGraphView) {
  'use strict';

  // For the sake of parity, calling this `root`
  var root = window;

  // Now set root.Rickshaw to undefined
  root.Rickshaw = void 0;

  // Add-ons
  Rickshaw.RickshawGraphView = RickshawGraphView;

  // And return Rickshaw
  return Rickshaw;
});
