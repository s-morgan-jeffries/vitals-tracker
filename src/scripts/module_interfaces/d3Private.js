define([
  'd3'
], function (d3) {
  'use strict';

  // For the sake of parity, calling this `root`
  var root = window;
//  console.log(this);
  // First call underscore's noConflict method. This may or may not lead to root._ being set to the _ defined by
  // underscore.string (some kind of race condition when that script runs, probably because of the asynchronous loading
  // used by RequireJS).
  //_.noConflict();
  // Now set root._ to undefined. Now it's definitely undefined.
  root.d3 = void 0;
  // Now define _.string / _.str
  //_.string = _.str = _s;
  // And return _
  return d3;
});
