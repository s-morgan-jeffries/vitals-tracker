define([
  'underscore',
  'backbone',
  'marionette',
  'customParsers',
//  'customSanitizers',
  'customValidators',
//  'backbone.dualstorage'
  'backbone.localstorage',
//  'backbone.forms'
  'backbone.validation'
], function (_, Backbone, Marionette, customParsers, customValidators) {
  'use strict';

  // Add custom validators
  _.extend(Backbone.Validation.validators, customValidators);
  // Add validators to models
  _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

  // Add parsers to views
  _.extend(Backbone.View.prototype, customParsers);

//  // Add sanitizers to views
//  _.extend(Backbone.View.prototype, customSanitizers);

  Marionette.noConflict();

  return Backbone.noConflict();
});