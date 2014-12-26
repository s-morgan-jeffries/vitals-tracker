define([
  'jquery',
  '../bower_components/underscore/underscore',
  'backbone',
  'views/partials/MeasurementsTableView',
  'views/partials/MeasurementEditView',
  'views/partials/MeasurementsGraphView',
  'templates'
], function ($, _, Backbone, MeasurementsTableView, MeasurementEditView, MeasurementsGraphView, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.template = function (serializedModel) {
    return templates.Patient(serializedModel);
  };

  protoProps.initialize = function () {
    Backbone.Courier.add(this);
    this.subViews = [];
  };

  protoProps.regions = {
    chartRegion: {
      el: '#patient-vitals-chart'
    },
    tableRegion: {
      el: '#patient-vitals-table'
    }
  };

  protoProps.onRender = function () {
    //this.showChart();
    //this.showTable();
  };

  protoProps.showChart = function () {
    var measurementsGraphView = this.measurementsGraphView = new MeasurementsGraphView({
      data: this.model.vitals
    });
    this.chartRegion.show(measurementsGraphView);
  };

  protoProps.showTable = function () {
    this.tableRegion.show((this.measurementsTable = new MeasurementsTableView({model: this.model})));
  };

  protoProps.onBeforeDestroy = function () {
    this.regionManager.emptyRegions();
  };

  return Backbone.Marionette.LayoutView.extend(protoProps, staticProps);
});
