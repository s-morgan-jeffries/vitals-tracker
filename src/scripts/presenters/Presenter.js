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
    this.initialize(options);
  };

  Presenter.prototype.initialize = function () {};

  Presenter.prototype.renderPartial = function (templateName) {
    var template = templates[templateName];
    if (template) {
      //console.log(template(this));
      //console.log(typeof template(this));
      return template(this);
    }
  };

  //Presenter.prototype.renderSubview = function (subviewName) {
  //  var subview = this.subviews[subviewName];
  //  console.log('subview:');
  //  console.log(subview);
  //  if (subview) {
  //    console.log(subview.render().el);
  //    return subview.render().el;
  //  }
  //};

  Presenter.prototype.log = function () {
    console.log.apply(console, arguments);
  };

  Presenter.extend = Backbone.Model.extend;

  return Presenter;
});
