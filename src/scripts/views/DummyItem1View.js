define([
  'underscore',
  'backbone',
  'templates'
], function (_, Backbone, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.tagName = 'div';

  //protoProps.initialize = function () {
  //  Backbone.Courier.add(this);
  //};

  protoProps.template = function (serializedModel) {
    return templates.DummyItem1(serializedModel);
  };

  return Backbone.Marionette.ItemView.extend(protoProps, staticProps);
});
