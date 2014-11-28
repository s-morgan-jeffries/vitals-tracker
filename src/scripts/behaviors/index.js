define([
  //'require',
  'backbone',
  'behaviors/CaptureAppLinks'
], function (Backbone, CaptureAppLinks) {
  'use strict';

  //var Backbone = require('backbone'),
  //  CaptureAppLinks = require('./CaptureAppLinks');

  var behaviors = {
    CaptureAppLinks: CaptureAppLinks
  };

  Backbone.Marionette.Behaviors.behaviorsLookup = function () {
    return behaviors;
  };

  return behaviors;
});
