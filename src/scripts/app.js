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
  //'HelloWorld',
  //'Timer',
  //'CommentBox',
  //'FilterableProductTable'
], function ($, _, Backbone, Patient, PatientView/*, HelloWorld, Timer, CommentBox, FilterableProductTable*/) {
  'use strict';

  var App,
    appConfig = {};

  appConfig.channelName = 'vitalsApp';

  appConfig.initialize = function () {
    patient = new Patient({id: '12345'});
    patientView = new PatientView({model: patient});
    //vitalsMeasurementsView = new VitalsMeasurementsView();
//    measurementView = new MeasurementNew();
//    FilterableProductTable.render($('#product-table')[0]);
  };

  App = Backbone.Marionette.Application.extend(appConfig);
  //app = new App();
  //channel = Backbone.Wreqr.radio.channel('vitalsApp');
  //measurement = new Measurement();
  //HelloWorld.render(document.getElementById('hello-world'), 'Doodoobutt');
  //$('.timer').each(function () {
  //  Timer.render(this);
  //});
  //CommentBox.render($('#comment-box')[0]);

  //return app;
  return new App();
});
