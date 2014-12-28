//var patientsPresenter;

define([
  'views/View',
  'templates'
], function (View, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.template = templates['pages/patient-list'];

  protoProps.initialize = function () {
    this.listenTo(this.collection, 'sync', this.render);
  };

  protoProps.createPresenter = function () {
    return this.collection.toPresenter();
  };

  return View.extend(protoProps, staticProps);
});
