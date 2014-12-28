define([
  'views/View',
  'templates',
  'appMediator'
], function (View, templates, appMediator) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  var DELAY = 10000;

  var redirectToHome = function () {
    appMediator.execute('goTo', 'home');
  };

  protoProps.template = templates['pages/logout'];

  protoProps.initialize = function () {
    // This sets a timeout on the redirectToHome function and saves the handle...
    this._redirectHandle = setTimeout(redirectToHome, DELAY);
    // ... so that this can clear the timeout if we navigate away from this page.
    this.listenTo(appMediator, 'route', this.cancelRedirect);
  };

  protoProps.cancelRedirect = function () {
    clearTimeout(this._redirectHandle);
    delete this._redirectHandle;
  };

  return View.extend(protoProps, staticProps);
});
