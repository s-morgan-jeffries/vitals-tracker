define([
  'views/View',
  'templates',
  'auth'
], function (View, templates, auth) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.template = templates['app-header'];

  protoProps.initialize = function () {
    this.listenTo(this.model, 'change:token', this.render);
  };

  protoProps._createPresenter = function () {
    return this.model.toPresenter();
  };

  protoProps.events = {
    'click .js-logout': function () {
      auth.logout();
    }
  };

  return View.extend(protoProps, staticProps);
});
