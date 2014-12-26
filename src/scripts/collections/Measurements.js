define([
  'collections/LoopBackCollection',
  'models/Measurement',
  'presenters/Measurements'
], function (LoopBackCollection, Measurement, MeasurementsPresenter) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.presenter = MeasurementsPresenter;

  protoProps.model = Measurement;

  return LoopBackCollection.extend(protoProps, staticProps);
});
