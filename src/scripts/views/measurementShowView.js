define([
  'underscore',
  'backbone',
  'templates'
], function (_, Backbone, templates) {
  'use strict';

  var instanceProps = {},
    staticProps = {};

  instanceProps.tagName = 'tr';

  instanceProps.template = function (serializedModel) {
    var defaults = {
      temperature: null,
      pulse: null,
      sbp: null,
      dbp: null,
      respirations: null,
      saturation: null
    };
    var data = _.defaults({}, serializedModel, defaults);
    return templates.measurementShow(data);
  };

  instanceProps.close = function () {
    this.off();
    this.stopListening();
    this.remove();
  };

  return Backbone.Marionette.ItemView.extend(instanceProps, staticProps);
});
