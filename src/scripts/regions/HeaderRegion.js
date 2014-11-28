var headerView;

define([
  'jquery',
  'underscore',
  'backbone',
  'HeaderView'
], function ($, _, Backbone, HeaderView) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.initialize = function () {
    //console.log('header region initialized');
    this.listenTo(this, 'show:header', this.showHeader);
  };

  protoProps.showHeader = function () {
    headerView = new HeaderView();
    this.show(headerView);
  };

  return Backbone.Marionette.Region.extend(protoProps, staticProps);
});
