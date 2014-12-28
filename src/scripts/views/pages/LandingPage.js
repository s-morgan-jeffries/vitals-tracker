define([
  'views/View',
  'templates'
], function (View, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.template = templates['pages/landing-page'];

  return View.extend(protoProps, staticProps);
});
