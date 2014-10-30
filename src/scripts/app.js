//var vitalsMeasurementsView;
//var app;
//var channel;
//var measurement;
//var measurementView;
var patient, patientView;

define([
  'jquery',
  'underscore',
  'backbone',
  'Patient',
  'PatientView'
], function ($, _, Backbone, Patient, PatientView) {
  'use strict';

  var App,
    appConfig = {};

  appConfig.channelName = 'vitalsApp';

  appConfig.initialize = function () {
    patient = new Patient({id: '12345'});
    patientView = new PatientView({model: patient});
    //vitalsMeasurementsView = new VitalsMeasurementsView();
//    measurementView = new MeasurementNew();
  };

  App = Backbone.Marionette.Application.extend(appConfig);
  //app = new App();
  //channel = Backbone.Wreqr.radio.channel('vitalsApp');
  //measurement = new Measurement();

  //return app;
  return new App();
});
