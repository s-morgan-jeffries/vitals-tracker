define([
  'jquery',
  'underscore',
  'backbone',
  'FooterView'
], function ($, _, Backbone, FooterView) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.initialize = function () {
    this.listenTo(this, 'show:footer', this.showFooter);
  };

  protoProps.showFooter = function () {
    this.show(new FooterView());
  };

  return Backbone.Marionette.Region.extend(protoProps, staticProps);
});
