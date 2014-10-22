var vitals,
//  measurementInputView,
  measurementDisplayView,
  measurementNew;

define([
  'underscore',
  'backbone',
  'jquery',
//  'templates',
//  'vitalsMeasurement',
  'vitalsMeasurements',
  'vitalsMeasurementView',
//  'measurementInputView',
  'MeasurementNew',
  'bootstrap'
], function (_, Backbone, $/*, templates, VitalsMeasurement*/, VitalsMeasurements, VitalsMeasurementView/*, MeasurementInputView*/, MeasurementNew) {
  'use strict';

  var vitalsMeasurementsViewProps = {},
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


  vitalsMeasurementsViewProps.el = $('#vitals-table')[0];

//  var ENTER_KEY = 13;

  vitalsMeasurementsViewProps.initialize = function () {
    // Attach handlers for built-in events
    var self = this;
    _.each(builtInEvents, function (eventName) {
      self.on(eventName, function () {
        console.log('TodoView:' + eventName);
      });
    });


    this.eventBus = Backbone.Wreqr.radio.channel('vitalsApp').vent;
    this.eventBus.on('saveMeasurement', function (measurementData) {
      self.vitals.addMeasurement(measurementData);
    });

    // Get the vitals
    vitals = this.vitals = new VitalsMeasurements(null, {collectionName: 'vitals'});
//    var inputView = new MeasurementInputView();
//    measurementInputView = inputView;
    measurementNew = new MeasurementNew();
    this.$el.find('tbody')
//      .append(inputView.el)
      .append(measurementNew.el);

    this.listenTo(this.vitals, 'add', this.addMeasurementView);
    this.vitals.fetch();
  };

  vitalsMeasurementsViewProps.addMeasurementView = function (measurement/*, collection, options*/) {
    var measurementView = new VitalsMeasurementView({model: measurement});
    measurementDisplayView = measurementView;
    this.$el.append(measurementView.render().el);
  };

//  vitalsMeasurementsViewProps.events = {
//    'keydown #measurement-input': 'addMeasurement'
//  };

  return Backbone.View.extend(vitalsMeasurementsViewProps);
});