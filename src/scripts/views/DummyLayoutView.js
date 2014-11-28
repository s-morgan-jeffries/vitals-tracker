define([
  'jquery',
  'underscore',
  'backbone',
  'DummyItem1View',
  //'MeasurementsTableView',
  //'MeasurementEditView',
  //'MeasurementsGraphView',
  'templates'
], function ($, _, Backbone, DummyItem1View, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.template = function (serializedModel) {
    return templates.DummyLayout(serializedModel);
  };

  protoProps.initialize = function () {
    //Backbone.Courier.add(this);
    //this.subViews = [];
    //this.showDummyItem1();
    console.log('dummy layout initialized');
  };

  protoProps.regions = {
    dummyRegion1: {
      el: '#dummy-region-1'
    }
  };

  protoProps.onShow = function () {
    //this.showChart();
    //this.showTable();
    //console.log(_.clone(this.el));
    //console.log('dummy layout rendered');
    this.showDummyItem1();
  };

  //protoProps.showChart = function () {
  //  var measurementsGraphView = this.measurementsGraphView = new MeasurementsGraphView({
  //    data: this.model.vitals
  //  });
  //  this.chartRegion.show(measurementsGraphView);
  //};

  protoProps.showDummyItem1 = function () {
    this.dummyRegion1.show((this.dummyItem1 = new DummyItem1View()));
  };

  protoProps.onBeforeDestroy = function () {
    this.regionManager.emptyRegions();
  };

  return Backbone.Marionette.LayoutView.extend(protoProps, staticProps);
});
