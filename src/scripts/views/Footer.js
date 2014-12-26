define([
  'views/View',
  'templates'
], function (View, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.template = templates['app-footer'];

  return View.extend(protoProps, staticProps);
});
