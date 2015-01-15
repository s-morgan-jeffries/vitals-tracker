define([
  '../../../bower_components/underscore/underscore',
  'backbone',
  'MeasurementsTableListView',
  'MeasurementEditView',
  'templates'
], function (_, Backbone, MeasurementsTableListView, MeasurementEditView, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.initialize = function () {
    Backbone.Courier.add(this);
    this.subViews = [];
  };

  protoProps.tagName = 'table';

  protoProps.template = function (serializedModel) {
    return templates.MeasurementsTable(serializedModel);
  };

  protoProps.onRender = function () {
    this.$el
      .addClass('table')
      .addClass('vitals-table')
    ;

    var measurementInput = this.measurementInput = new MeasurementEditView();
    measurementInput.render();
    this.subViews.push(measurementInput);
    this.$el
      .find('tbody')
      .append(measurementInput.el);
    this.listenTo(measurementInput, 'measurement:submit', this.addMeasurement);

    var measurementsTable = this.measurementsTable = new MeasurementsTableListView({collection: this.model.vitals});
    this.subViews.push(measurementsTable);
    this.$el
      .append(measurementsTable.el);

  };

  protoProps.addMeasurement = function (measurement, measurementInput) {
    this.model.createMeasurement(measurement.toJSON());
    measurementInput.resetForm();
  };

  protoProps.onBeforeDestroy = function () {
    _.each(this.subViews, function (childView) {
      childView.close();
    });
  };

  return Backbone.Marionette.ItemView.extend(protoProps, staticProps);
});
