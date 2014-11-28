define([
  'backbone'
], function (Backbone) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.initialize = function () {
    console.log('I am the TestView initializer.');
  };

  return Backbone.View.extend(protoProps, staticProps);
});
