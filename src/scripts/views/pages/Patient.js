//var patient;
define([
  'views/View',
  'views/partials/MeasurementForm',
  'views/partials/MeasurementsGraph',
  'views/partials/MeasurementsTable',
  'templates'
], function (View, MeasurementFormView, MeasurementsGraphView, MeasurementsTableView, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.template = templates['pages/patient'];

  protoProps.initialize = function () {
    this.listenTo(this.model, 'change', this.render);

    //this.listenTo(this.model.measurements, 'change', this.render);
  };

  protoProps._createPresenter = function () {
    return this.model.toPresenter();
  };

  protoProps._createSubviews = function () {
    this.subviews = {
      measurementForm: new MeasurementFormView({collection: this.model.measurements}),
      measurementsGraph: new MeasurementsGraphView({collection: this.model.measurements}),
      measurementsTable: new MeasurementsTableView({collection: this.model.measurements})
    };
    return this;
  };

  protoProps._onRender = function () {
    //var subviews = this.subviews;
    //if (subviews) {
    //
    //}
    this.subviews.measurementsGraph.trigger('parent:rendered');
    return this;
  };

  return View.extend(protoProps, staticProps);
});
