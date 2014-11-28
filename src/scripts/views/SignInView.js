define([
  'underscore',
  'backbone',
  'appChannel',
  'text!../templates/sign-in.html'
], function (_, Backbone, appChannel, template) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.tagName = 'div';

  var renderTemplate = _.template(template);

  protoProps.template = function (serializedModel) {
    return renderTemplate(serializedModel);
  };

  protoProps.behaviors = {
    CaptureAppLinks: {}
  };

  return Backbone.Marionette.ItemView.extend(protoProps, staticProps);
});
