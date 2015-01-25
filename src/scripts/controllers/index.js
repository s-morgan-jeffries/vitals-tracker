define(function (require) {
  'use strict';

  return {
    home: require('controllers/home'),
    userHome: require('controllers/userHome'),
    about: require('controllers/about'),
    register: require('controllers/register'),
    login: require('controllers/login'),
    logout: require('controllers/logout'),
    patientList: require('controllers/patientList'),
    patient: require('controllers/patient')
  };
});
