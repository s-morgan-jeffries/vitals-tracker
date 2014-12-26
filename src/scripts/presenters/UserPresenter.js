define([
  'presenters/Presenter'
], function (Presenter) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.defaults = {
    username: '',
    email: ''
  };

  return Presenter.extend(protoProps, staticProps);
});
