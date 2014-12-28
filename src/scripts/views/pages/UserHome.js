define([
  'views/View',
  'templates'
], function (View, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.template = templates['pages/user-home'];

  protoProps.initialize = function () {
    this.listenTo(this.model, 'change', this.render);
  };

  protoProps.createPresenter = function () {
    return this.model.toPresenter();
  };

  return View.extend(protoProps, staticProps);
});
