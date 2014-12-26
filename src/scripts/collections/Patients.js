define([
  'collections/LoopBackCollection',
  'presenters/Patients',
  'models/Patient',
  'apiUrl'
], function (LoopBackCollection, PatientsPresenter, Patient, apiUrl) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.presenter = PatientsPresenter;

  protoProps.model = Patient;

  protoProps.url = function () {
    return apiUrl('patients');
  };

  return LoopBackCollection.extend(protoProps, staticProps);
});
