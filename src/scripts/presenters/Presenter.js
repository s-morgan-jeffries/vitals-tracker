define([
  'underscore',
  'backbone',
  'templates'
], function (_, Backbone, templates) {
  'use strict';

  var Presenter = function (options) {
    options = options || {};
    this.model = options.model || {};
    _.defaults(this, _.result(this, 'defaults'));
    _.extend(this, this.model.attributes);
    this.cid = this.model.cid;
    this.initialize(options);
  };

  Presenter.prototype.initialize = function () {};

  Presenter.prototype.renderPartial = function (templateName) {
    var template = templates[templateName];
    if (template) {
      return template(this);
    }
  };

  Presenter.prototype.log = function () {
    console.log.apply(console, arguments);
  };

  Presenter.extend = Backbone.Model.extend;

  return Presenter;
});
