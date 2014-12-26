define([
  'models/LoopBackModel',
  'presenters/Patient',
  'collections/Measurements',
  'apiUrl'
], function (LoopBackModel, PatientPresenter, Measurements, apiUrl) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.presenter = PatientPresenter;

  protoProps.initialize = function (options) {
    LoopBackModel.prototype.initialize.call(this, options);
    var self = this;
    // t0d0: Fix this bit here - this should get passed to the table view
    this.measurements = new Measurements();
    this.measurements.url = function () {
      return apiUrl('patient measurements', {patientId: self.id});
    };
    this.listenTo(this, 'sync', this.getMeasurements);
  };

  protoProps.getMeasurements = function () {
    var includedMeasurements = this.get('measurements');
    if (includedMeasurements) {
      this.measurements.replace(includedMeasurements);
      this.unset('measurements');
    }
    this.measurements.fetch();
  };

  protoProps.url = function () {
    return apiUrl('patient', {patientId: this.id});
  };

  return LoopBackModel.extend(protoProps, staticProps);
});
