define([
  'underscore',
  'backbone',
  'text!../templates/about.html'
], function (_, Backbone, template) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.tagName = 'div';

  //protoProps.initialize = function () {
  //  Backbone.Courier.add(this);
  //};
  var renderTemplate = _.template(template);

  protoProps.template = function (serializedModel) {
    return renderTemplate(serializedModel);
  };

  return Backbone.Marionette.ItemView.extend(protoProps, staticProps);
});
