define([
  'views/pages/Patient',
  'models/Patient',
  'appState',
  'appMediator'
], function (PatientView, Patient, appState, appMediator) {
  'use strict';

  return function (patientId) {
    var isAuthenticated = appMediator.execute('isAuthenticated'),
      patients,
      patient;
    if (isAuthenticated) {
      patients = appMediator.execute('getPatients');
      patient = patients.get(patientId);
      if (!patient) {
        patient = new Patient({id: patientId});
      }
      patient.fetch();
      this.show(new PatientView({model: patient}));
    } else {
      appMediator.execute('goTo', 'home');
    }
  };
});
