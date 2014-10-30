define([
  'underscore',
  'backbone',
  'moment',
  'Measurements'
], function (_, Backbone, moment, Measurements) {
  'use strict';

  var instanceProps = {},
    staticProps = {};

  instanceProps.localStorage = new Backbone.LocalStorage('Patient');

  instanceProps.initialize = function () {
    this.vitals = new Measurements();
    if (this.id) {
      this.setUrl();
      this.fetch();
      this.vitals.fetch();
    }
    this.on('change:id', this.setUrl);
  };

  instanceProps.setUrl = function () {
    this.url = '/patients/' + this.id;
    this.setLocalStorage();
    this.setVitalsUrl();
  };

  instanceProps.setLocalStorage = function () {
    //var url = this.url,
    //  regex = /^\/patients\/(\d+)$/,
    //  id = regex.exec(url)[1],
    //  localStorageName = 'patient-' + id;
    var localStorageName = 'patient';
    this.localStorage = new Backbone.LocalStorage(localStorageName);
  };

  instanceProps.setVitalsUrl = function () {
    var vitalsUrl = this.url + '/vitals';
    this.vitals.setUrl(vitalsUrl);
  };

  instanceProps.validation = {
    createdAt: {
      required: true,
      isValidDate: true
    },
    updatedAt: {
      required: true,
      isValidDate: true
    }
  };

  instanceProps.defaults = function () {
    var now = moment();
    return {
      createdAt: now,
      updatedAt: now
    };
  };

  instanceProps.createMeasurement = function (measurementData) {
    this.vitals.create(measurementData);
  };

  instanceProps.parse = function (response/*, options*/) {
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

  return Backbone.Model.extend(instanceProps, staticProps);
});
