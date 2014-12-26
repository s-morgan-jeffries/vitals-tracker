//var patients;

define([
  'views/pages/PatientList',
  'collections/Patients',
  'appState',
  'appMediator'
], function (PatientListView, Patients, appState, appMediator) {
  'use strict';

  return function () {
    var isAuthenticated = appMediator.execute('isAuthenticated'),
      patients;
    if (isAuthenticated) {
      patients = appMediator.execute('getPatients');
      patients.fetch();
      this.show(new PatientListView({collection: patients}));
    } else {
      appMediator.execute('goTo', 'home');
    }
  };
});
