define([
  'jquery',
  'underscore',
  'backbone',
  'MeasurementsTableView',
  'MeasurementEditView',
  'MeasurementsGraphView'
], function ($, _, Backbone, MeasurementsTableView, MeasurementEditView, MeasurementsGraphView) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.el = $('#vitals-app')[0];

  protoProps.initialize = function () {

    Backbone.Courier.add(this);

    this.subViews = [];

    //simpleLineGraph();

    var measurementsGraphView = this.measurementsGraphView = new MeasurementsGraphView({
      el: $('#vitals-chart')[0],
      data: this.model.vitals,
      collection: this.model.vitals
    });
    //var measurementsGraphView = this.measurementsGraphView = new MeasurementsGraphView();
    measurementsGraphView.render();
    this.subViews.push(measurementsGraphView);
    this.$el
      .find('#vitals-chart')
      .append(measurementsGraphView.el);

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
    //console.log(measurement);
    this.model.createMeasurement(measurement.toJSON());
    //console.log(measurement.attributes);
    //measurement.save();
    measurementInput.resetMeasurement();
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
