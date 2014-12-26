define([
  'backbone',
  'presenters/Presenter'
], function (Backbone, Presenter) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.initialize = function (models, options) {
    options = options || {};
    this.url = options.url || this.url;
  };

  protoProps.presenter = Presenter;

  protoProps.toPresenter = function () {
    var Presenter = this.presenter;
    return new Presenter({model: this});
  };

  return Backbone.Collection.extend(protoProps, staticProps);
});
