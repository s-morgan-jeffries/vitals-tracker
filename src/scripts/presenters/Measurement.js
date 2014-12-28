define([
  'presenters/Presenter',
  'moment'
], function (Presenter, moment) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.initialize = function () {
    this.measuredAt = moment(this.measuredAt);
  };

  protoProps.defaults = function () {
    return {
      temperature: null,
      pulse: null,
      sbp: null,
      dbp: null,
      respirations: null,
      saturation: null
    };
  };

  return Presenter.extend(protoProps, staticProps);
});
