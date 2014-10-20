var vitalsMeasurementsView;
var app;
var channel;
var measurement;
//var measurementView;

define([
  'jquery',
  'underscore',
  'backbone',
  'vitalsMeasurementsView',
  'Measurement',
  'MeasurementNew'
], function ($, _, Backbone, VitalsMeasurementsView, Measurement) {
  'use strict';

  var App,
    appConfig = {};

  appConfig.channelName = 'vitalsApp';

  appConfig.initialize = function () {
    vitalsMeasurementsView = new VitalsMeasurementsView();
//    measurementView = new MeasurementNew();
  };

  App = Backbone.Marionette.Application.extend(appConfig);
  app = new App();
  channel = Backbone.Wreqr.radio.channel('vitalsApp');
  measurement = new Measurement();

  return app;
});