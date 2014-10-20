var vitalsMeasurementsView;
//var app;

define([
  'jquery',
  'underscore',
  'backbone',
  'vitalsMeasurementsView'
], function ($, _, Backbone, VitalsMeasurementsView) {
  'use strict';

  var app = new Backbone.Marionette.Application();



  app.addInitializer(function () {
    vitalsMeasurementsView = new VitalsMeasurementsView();
//    app = vitalsApp;
  });

  return app;
});