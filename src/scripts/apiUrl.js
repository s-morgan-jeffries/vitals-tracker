define([], function () {
  'use strict';

  var protocol = 'http',
    hostname = '0.0.0.0',
    port = '3000';

  var paths = {
    authors: function () {
      return '/api/Authors';
    },
    'author books': function (params) {
      return '/api/Authors/' + params.id + '/books/';
    },
    book: function (params) {
      return '/api/Books/' + params.id;
    },
    books: function () {
      return '/api/Books';
    },
    patient: function (params) {
      return '/api/patients/' + params.patientId;
    },
    patients: function () {
      return '/api/patients/';
    },
    'patient measurements': function (params) {
      return '/api/patients/' + params.patientId + '/measurements';
    },
    users: function () {
      return '/api/ApiUsers';
    },
    user: function (params) {
      return '/api/ApiUsers/' + params.id;
    },
    'user patients': function () {
      return '/api/Patients/';
    },
    register: function () {
      return '/api/ApiUsers';
    },
    'login': function () {
      return '/api/ApiUsers/login';
    },
    'logout': function () {
      return '/api/ApiUsers/logout';
    }
  };

  var host = function () {
    return protocol + '://' + hostname + ':' + port;
  };

  var apiUrl = function (type, params) {
    if (paths[type]) {
      return host() + paths[type](params);
    }
  };

  apiUrl.protocol = function () {
    return protocol;
  };

  apiUrl.hostname = function () {
    return hostname;
  };

  apiUrl.port = function () {
    return port;
  };

  apiUrl.host = host;

  return apiUrl;
});
