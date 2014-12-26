define([
  'underscore',
  'underscore.string'
], function (_, _s) {
  'use strict';

  // For the sake of parity, calling this `root`
  var root = window;
  // First call underscore's noConflict method. This may or may not lead to root._ being set to the _ defined by
  // underscore.string (some kind of race condition when that script runs, probably because of the asynchronous loading
  // used by RequireJS).
  _.noConflict();
  // Now set root._ to undefined. Now it's definitely undefined.
  root._ = void 0;
  // Now define _.string / _.str
  _.string = _.str = _s;
  // EDIT: Now redefine root._ because we need underscore in the global namespace (for backbone.DOMStorage). Doing it
  // this way because if the situation changes, and we no longer need underscore to be a global, we can just comment out
  // this line.
  root._ = _;
  // And return _
  return _;
});
