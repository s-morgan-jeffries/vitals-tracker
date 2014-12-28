define([
  'models/LoopBackModel',
  'presenters/Measurement'
], function (LoopBackModel, MeasurementPresenter) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.stale = ['isEditing'];

  protoProps.presenter = MeasurementPresenter;

  protoProps.defaults = {
    isEditing: false
  };

  // t0d0: Write validation functions (mixin)
  protoProps.validate = function (attr) {
    //attr =
    console.log(attr);
  };

  return LoopBackModel.extend(protoProps, staticProps);
});
