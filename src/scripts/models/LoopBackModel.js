define([
  'models/Model',
  'plugins/loopBackConnection'
], function (Model, loopBackConnection) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  //protoProps.initialize = function (options) {
  //  options = options || {};
  //  this.url = options.url || this.url;
  //};

  protoProps.sync = loopBackConnection.sync;

  return Model.extend(protoProps, staticProps);
});
