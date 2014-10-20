define([
  'underscore',
  'backbone',
  'vitalsMeasurement'
], function (_, Backbone, VitalsMeasurement) {
  'use strict';

  var vitalsMeasurementsProps = {},
    VitalsMeasurements,
    builtInEvents = [
      'add',
      'remove',
      'reset',
      'sort',
      'change',
      'destroy',
      'request',
      'sync',
      'error',
      'invalid',
      'route'/*,
       'all',
       'doodoo'*/
    ];

  // Events:
//  'add' (model, collection, options) — when a model is added to a collection.
//  'remove' (model, collection, options) — when a model is removed from a collection.
//  'reset' (collection, options) — when the collection's entire contents have been replaced.
//  'sort' (collection, options) — when the collection has been re-sorted.
//  'change' (model, options) — when a model's attributes have changed.
//  'change:[attribute]' (model, value, options) — when a specific attribute has been updated.
//  'destroy' (model, collection, options) — when a model is destroyed.
//  'request' (model_or_collection, xhr, options) — when a model or collection has started a request to the server.
//  'sync' (model_or_collection, resp, options) — when a model or collection has been successfully synced with the server.
//  'error' (model_or_collection, resp, options) — when model's or collection's request to remote server has failed.
//  'invalid' (model, error, options) — when a model's validation fails on the client.
//  'route:[name]' (params) — Fired by the router when a specific route is matched.
//  'route' (route, params) — Fired by the router when any route has been matched.
//  'route' (router, route, params) — Fired by history when any route has been matched.
//  'all' — this special event fires for any triggered event, passing the event name as the first argument.

  vitalsMeasurementsProps.model = VitalsMeasurement;
  vitalsMeasurementsProps.initialize = function (models, options) {


    // jshint expr: true
    options || (options = {});
    // jshint expr: false

    var self = this;
    _.each(builtInEvents, function (eventName) {
      self.on(eventName, function () {
        console.log('VitalsMeasurements:' + eventName);
      });
    });

    var collectionName = options.collectionName || 'VitalsMeasurements';
    this.localStorage = new Backbone.LocalStorage(collectionName);
  };

  vitalsMeasurementsProps.comparator = 'measuredAt';

  vitalsMeasurementsProps.addMeasurement = function (measurementData) {
    this.create(measurementData);
  };

  VitalsMeasurements = Backbone.Collection.extend(vitalsMeasurementsProps);

  return VitalsMeasurements;
});