define([
  'jquery',
  'underscore',
  'backbone',
  'MeasurementEditViewOrig',
  'MeasurementsTableView',
  'MeasurementEditView'
], function ($, _, Backbone, MeasurementEditViewOrig, MeasurementsTableView, MeasurementEditView) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.el = $('#vitals-app')[0];

  protoProps.initialize = function () {

    this.subViews = [];

    var measurementInput = this.measurementInput = new MeasurementEditView();
    measurementInput.render();
    this.subViews.push(measurementInput);
    this.$el
      //.find('#vitals-form-table')
      .find('#vitals-table')
      .find('tbody')
      .append(measurementInput.el);
    this.listenTo(measurementInput, 'measurement:submit', this.addMeasurement);

    var measurementsTable = this.measurementsTable = new MeasurementsTableView({collection: this.model.vitals});
    this.subViews.push(measurementsTable);
    this.$el
      .find('#vitals-table')
      .append(measurementsTable.el);
  };

  protoProps.addMeasurement = function (measurement, measurementInput) {
    this.model.createMeasurement(measurement.toJSON());
    //console.log(measurement.attributes);
    //measurement.save();
    measurementInput.reset();
  };

  protoProps.close = function () {
    this.off();
    this.stopListening();
    _.each(this.subViews, function (childView) {
      childView.close();
    });
    this.remove();
  };

  return Backbone.View.extend(protoProps, staticProps);
});
