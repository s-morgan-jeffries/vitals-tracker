define([
  'backbone',
  'Measurement'
], function (Backbone, Measurement) {
  'use strict';

  var collectionProps = {},
    Measurements;

  collectionProps.model = Measurement;
  collectionProps.initialize = function (models, options) {

    // jshint expr: true
    options || (options = {});
    // jshint expr: false

    var collectionName = options.collectionName || 'Measurements';
    this.localStorage = new Backbone.LocalStorage(collectionName);

    // Sort when the comparator changes
    this.on('change:measuredAt', function () {
      this.sort();
    });
  };

  // This is used
  collectionProps.comparator = 'measuredAt';

  collectionProps.addMeasurement = function (measurementData) {
    this.create(measurementData);
  };

  Measurements = Backbone.Collection.extend(collectionProps);

  return Measurements;
});
