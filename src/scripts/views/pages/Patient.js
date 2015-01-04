//var patient;
define([
  'views/View',
  'views/partials/MeasurementsTable',
  'templates'
], function (View, MeasurementsTableView, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.template = templates['pages/patient'];

  protoProps.initialize = function () {
    this.listenTo(this.model, 'change', this.render);
    //this.listenTo(this.model.measurements, 'change', this.render);
  };

  protoProps.createPresenter = function () {
    return this.model.toPresenter();
  };

  protoProps.createSubviews = function () {
    this.subviews = {
      measurementsTable: new MeasurementsTableView({collection: this.model.measurements})
    };
    return this;
  };

  return View.extend(protoProps, staticProps);
});
