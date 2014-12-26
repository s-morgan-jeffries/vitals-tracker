define([
  '../../bower_components/underscore/underscore',
  'backbone',
  'moment',
  'collections/Measurements'
], function (_, Backbone, moment, Measurements) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.localStorage = new Backbone.LocalStorage('Patient');

  protoProps.initialize = function () {
    this.vitals = new Measurements();
    if (this.id) {
      this.setUrl();
      this.fetch();
      this.vitals.fetch();
    }
    this.on('change:id', this.setUrl);
  };

  protoProps.setUrl = function () {
    this.url = '/patients/' + this.id;
    this.setLocalStorage();
    this.setVitalsUrl();
  };

  protoProps.setLocalStorage = function () {
    //var url = this.url,
    //  regex = /^\/patients\/(\d+)$/,
    //  id = regex.exec(url)[1],
    //  localStorageName = 'patient-' + id;
    var localStorageName = 'patient';
    this.localStorage = new Backbone.LocalStorage(localStorageName);
  };

  protoProps.setVitalsUrl = function () {
    var vitalsUrl = this.url + '/vitals';
    this.vitals.setUrl(vitalsUrl);
  };

  protoProps.validation = {
    createdAt: {
      required: true,
      isValidDate: true
    },
    updatedAt: {
      required: true,
      isValidDate: true
    }
  };

  protoProps.defaults = function () {
    var now = moment();
    return {
      createdAt: now,
      updatedAt: now
    };
  };

  protoProps.createMeasurement = function (measurementData) {
    this.vitals.create(measurementData);
  };

  protoProps.parse = function (response/*, options*/) {
    // createdAt
    if (response.createdAt) {
      response.createdAt = moment(response.createdAt);
    }
    // updatedAt
    if (response.updatedAt) {
      response.updatedAt = moment(response.updatedAt);
    }

    return response;
  };

  return Backbone.Model.extend(protoProps, staticProps);
});
