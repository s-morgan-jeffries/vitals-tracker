define([
  'underscore',
  'text!../templates/measurement-display-template.html',
  'text!../templates/measurement-input-template.html',
  'text!../templates/measurement-new.html'
], function (_, measurementDisplayTemplate, measurementInputTemplate, MeasurementNew) {
  return {
//    measurementDisplayTemplate: measurementDisplayTemplate,
    measurementDisplayTemplate: _.template(measurementDisplayTemplate),
    measurementInputTemplate: _.template(measurementInputTemplate),
    MeasurementNew: _.template(MeasurementNew)
  };
});