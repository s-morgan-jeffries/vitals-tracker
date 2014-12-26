define([
  'presenters/Presenter',
  'appMediator'
], function (Presenter, appMediator) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.isAuthenticated = function () {
    return appMediator.execute('isAuthenticated');
  };

  return Presenter.extend(protoProps, staticProps);
});
