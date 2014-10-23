var vitals,
//  measurementInputView,
  measurementDisplayView,
  measurementNew;

define([
  'underscore',
  'backbone',
  'jquery',
  'vitalsMeasurements',
  'vitalsMeasurementView',
  'MeasurementEditView',
  'bootstrap'
], function (_, Backbone, $, VitalsMeasurements, VitalsMeasurementView, MeasurementEditView) {
  'use strict';

  var viewProps = {};

  viewProps.el = $('#vitals-table')[0];

  viewProps.initialize = function () {
    var self = this;

    this.eventBus = Backbone.Wreqr.radio.channel('vitalsApp').vent;
    this.eventBus.on('saveMeasurement', function (measurementData) {
      self.vitals.addMeasurement(measurementData);
    });

    // Get the vitals
    vitals = this.vitals = new VitalsMeasurements(null, {collectionName: 'vitals'});
    measurementNew = new MeasurementEditView();
    this.$el.find('tbody')
//      .append(inputView.el)
      .append(measurementNew.el);

    this.listenTo(this.vitals, 'add', this.addMeasurementView);
    this.vitals.fetch();
  };

  viewProps.addMeasurementView = function (measurement/*, collection, options*/) {
    var measurementView = new VitalsMeasurementView({model: measurement});
    measurementDisplayView = measurementView;
    this.$el.append(measurementView.render().el);
  };

//  viewProps.events = {
//    'keydown #measurement-input': 'addMeasurement'
//  };

  return Backbone.View.extend(viewProps);
});
