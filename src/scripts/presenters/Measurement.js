define([
  'presenters/Presenter'
], function (Presenter) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  return Presenter.extend(protoProps, staticProps);
});
