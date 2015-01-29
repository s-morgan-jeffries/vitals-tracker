define(function (require/*, exports, module*/) {
  'use strict';

  var _ = require('underscore');

  return {
    'app': _.template(require('text!../templates/app.html')),
    'app-header': _.template(require('text!../templates/partials/app-header.html')),
    'app-content': _.template(require('text!../templates/app-content.html')),
    'app-footer': _.template(require('text!../templates/partials/app-footer.html')),
    'pages/landing-page': _.template(require('text!../templates/pages/landing-page.html')),
    'pages/register': _.template(require('text!../templates/pages/register.html')),
    'pages/login': _.template(require('text!../templates/pages/login.html')),
    'pages/about': _.template(require('text!../templates/pages/about.html')),
    'pages/user-home': _.template(require('text!../templates/pages/user-home.html')),
    'pages/patient-list': _.template(require('text!../templates/pages/patient-list.html')),
    'pages/patient': _.template(require('text!../templates/pages/patient.html')),
    'pages/logout': _.template(require('text!../templates/pages/logout.html')),
    'partials/user-info': _.template(require('text!../templates/partials/user-info.html')),
    'partials/patient-list-item': _.template(require('text!../templates/partials/patient-list-item.html')),
    'partials/measurement-form': _.template(require('text!../templates/partials/measurement-form.html')),
    'partials/measurements-graph': _.template(require('text!../templates/partials/measurements-graph.html')),
    'partials/measurements-table': _.template(require('text!../templates/partials/measurements-table.html')),
    'partials/measurement': _.template(require('text!../templates/partials/measurement.html'))
  };
});
