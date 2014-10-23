define([
  'underscore',
  'backbone',
  'templates'
], function (_, Backbone, templates) {
  'use strict';

  var viewProps = {};

  viewProps.tagName = 'tr';

  viewProps.template = function (serializedModel) {
    return templates.measurementDisplayTemplate(serializedModel);
  };

  viewProps.initialize = function () {
    this.render();
  };

  return Backbone.Marionette.ItemView.extend(viewProps);
});
