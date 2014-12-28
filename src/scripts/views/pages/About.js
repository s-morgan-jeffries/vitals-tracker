define([
  'views/View',
  'templates'
], function (View, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.template = templates['pages/about'];

  return View.extend(protoProps, staticProps);
});
