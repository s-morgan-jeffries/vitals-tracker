define([
  'presenters/Presenter'
], function (Presenter) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.forEach = function (fn) {
    var result = [],
      models = this.model.models,
      presenter;
    for (var i = 0, len = models.length; i < len; i++) {
      presenter = models[i].toPresenter();
      result.push(fn(presenter));
    }
    return result;
  };

  return Presenter.extend(protoProps, staticProps);
});
