define([
  'underscore',
  'backbone',
  'templates'
], function (_, Backbone, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.tagName = 'div';

  protoProps.template = function (serializedModel) {
    return templates.Footer(serializedModel);
  };

  return Backbone.Marionette.ItemView.extend(protoProps, staticProps);
});
