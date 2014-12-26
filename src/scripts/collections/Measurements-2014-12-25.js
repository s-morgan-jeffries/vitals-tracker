define([
  'backbone',
  'models/Measurement'
], function (Backbone, Measurement) {
  'use strict';

  var instanceProps = {},
    staticProps = {};

  instanceProps.model = Measurement;

  instanceProps.initialize = function (/*models, options*/) {

    // Sort when the comparator changes
    this.on('sync', function () {
      //console.log('synced');
      this.sort();
    });
  };

  // This is used for sorting
  instanceProps.comparator = 'measuredAt';

  instanceProps.setLocalStorage = function () {
    var url = this.url,
      regex = /^\/patients\/(\d+)\/vitals/,
      id = regex.exec(url)[1],
      localStorageName = 'patient-' + id + '-vitals';
    this.localStorage = new Backbone.LocalStorage(localStorageName);
  };

  instanceProps.setUrl = function (url) {
    this.url = url;
    this.setLocalStorage();
  };

  return Backbone.Collection.extend(instanceProps, staticProps);
});
