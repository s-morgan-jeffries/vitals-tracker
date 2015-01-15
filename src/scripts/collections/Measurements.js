define([
  'collections/LoopBackCollection',
  'models/Measurement',
  'presenters/Measurements'
], function (LoopBackCollection, Measurement, MeasurementsPresenter) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.initialize = function () {
    LoopBackCollection.prototype.initialize.apply(this, arguments);
    // Sort when the value of the comparator changes
    this.listenTo(this, 'change:' + this.comparator, this.sort);
  };

  protoProps.presenter = MeasurementsPresenter;

  protoProps.model = Measurement;

  protoProps.comparator = 'measuredAt';

  return LoopBackCollection.extend(protoProps, staticProps);
});
