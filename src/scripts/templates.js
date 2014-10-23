define([
  'underscore',
  'text!../templates/measurement-show-template.html',
  //'text!../templates/measurement-input-template.html',
  'text!../templates/measurement-edit-template.html'
], function (_, measurementShowTemplate, MeasurementEditTemplate) {
  'use strict';

  return {
//    measurementDisplayTemplate: measurementDisplayTemplate,
    measurementShow: _.template(measurementShowTemplate),
    //measurementInputTemplate: _.template(measurementInputTemplate),
    MeasurementEdit: _.template(MeasurementEditTemplate)
  };
});
