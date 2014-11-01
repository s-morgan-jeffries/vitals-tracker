define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'customParsers',
  'customValidators',
  'backbone.courier',
  'backbone.localstorage',
  'backbone.validation',
  'bootstrap'
], function ($, _, Backbone, Marionette, customParsers, customValidators) {
  'use strict';

  // Add custom validators
  _.extend(Backbone.Validation.validators, customValidators);
  // Add validators to models
  _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

  // Add parsers to views
  _.extend(Backbone.View.prototype, customParsers);

  // Get rid of the global reference to Backbone and return Backbone as the module
  return Backbone.noConflict();
});
