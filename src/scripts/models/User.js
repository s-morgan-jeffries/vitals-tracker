define([
  'models/LoopBackModel',
  'presenters/UserPresenter',
  'collections/Patients',
  'apiUrl'
], function (LoopBackModel, UserPresenter, Patients, apiUrl) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.url = function () {
    return apiUrl('user', {id: this.id});
  };

  protoProps.initialize = function (options) {
    LoopBackModel.prototype.initialize.call(this, options);
    var self = this;
    this.patients = new Patients(null, {
      url: function () {
        return apiUrl('user patients', {id: self.id});
      }
    });
    this.listenTo(this, 'sync', this.getPatients);
  };

  protoProps.getPatients = function () {
    var includedPatients = this.get('patients');
    if (includedPatients) {
      this.patients.replace(includedPatients);
      this.unset('patients');
    }
    this.patients.fetch();
  };

  protoProps.presenter = UserPresenter;

  return LoopBackModel.extend(protoProps, staticProps);
});
