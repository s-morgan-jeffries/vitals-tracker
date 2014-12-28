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

  protoProps.template = templates['pages/register'];

  protoProps.events = {
    'submit #registrationform': 'submitRegistration'
  };

  protoProps.submitRegistration = function (event) {
    event.preventDefault();
    var attr = this.attributesFrom($(event.target));
    attr = _.pick(attr, 'email', 'password');
    auth.register(attr);
  };

  return View.extend(protoProps, staticProps);
});
