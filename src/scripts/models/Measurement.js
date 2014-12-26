define([
  'models/LoopBackModel',
  'presenters/Measurement'
], function (LoopBackModel, MeasurementPresenter) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.presenter = MeasurementPresenter;

  //protoProps.url = function () {};

  return LoopBackModel.extend(protoProps, staticProps);
});
