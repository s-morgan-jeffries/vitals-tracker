define([
  'presenters/Presenter'
], function (Presenter) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.initialize = function (options) {
    Presenter.prototype.initialize.call(this, options);
    this.measurements = this.model.measurements;
  };

  protoProps.defaults = {
    firstName: '',
    lastName: ''
  };

  protoProps.url = function () {
    return this.model.url();
  };

  return Presenter.extend(protoProps, staticProps);
});
