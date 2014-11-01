define([
  'underscore',
  'text!../templates/measurement-show-template.html',
  'text!../templates/measurement-edit-template.html'
], function (_, measurementShowTemplate, MeasurementEditTemplate) {
  'use strict';

  return {
    measurementShow: _.template(measurementShowTemplate),
    MeasurementEdit: _.template(MeasurementEditTemplate)
  };
});
