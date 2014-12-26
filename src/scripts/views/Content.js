define([
  'backbone',
  'views/RegionView',
  'controllers/index',
  'templates'
], function (Backbone, RegionView, controllers, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.template = templates['app-content'];

  protoProps.initialize = function () {
    // Listen for `route` events and call the appropriate controller.
    this.addControllers(controllers);
  };

  return RegionView.extend(protoProps, staticProps);
});
