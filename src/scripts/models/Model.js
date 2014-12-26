define([
  'underscore',
  'backbone',
  'presenters/Presenter'
], function (_, Backbone, Presenter) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.initialize = function (options) {
    options = options || {};
    this.url = options.url || this.url;
  };

  protoProps.stale = [];

  protoProps.toJSON = function () {
    return _.omit(this.attributes, this.stale);
  };

  protoProps.presenter = Presenter;

  protoProps.toPresenter = function () {
    var Presenter = this.presenter;
    return new Presenter({model: this});
  };

  return Backbone.Model.extend(protoProps, staticProps);
});
