define([
  'underscore',
  'backbone',
  'moment',
  'templates'
//  'vitalsMeasurement'
], function (_, Backbone, moment, templates) {
  'use strict';

  var vitalsMeasurementViewProps = {};

  vitalsMeasurementViewProps.tagName = 'tr';

  vitalsMeasurementViewProps.template = function (serializedModel) {
    return templates.measurementDisplayTemplate(serializedModel);
  };

  vitalsMeasurementViewProps.initialize = function () {
    this.render();
  };

  return Backbone.Marionette.ItemView.extend(vitalsMeasurementViewProps);
});