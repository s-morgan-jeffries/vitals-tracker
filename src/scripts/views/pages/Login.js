define([
  'jquery',
  'underscore',
  'views/View',
  'templates',
  'auth'
], function ($, _, View, templates, auth) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.template = templates['pages/login'];

  protoProps.events = {
    'submit #loginform': 'submitLogin'
  };

  protoProps.submitLogin = function (event) {
    event.preventDefault();
    var attr = this.attributesFrom($(event.target));
    attr = _.pick(attr, 'email', 'password');
    auth.login(attr);
  };

  return View.extend(protoProps, staticProps);
});
