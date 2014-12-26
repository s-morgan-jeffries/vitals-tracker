var patientView;
define([
  'jquery',
  '../../bower_components/underscore/underscore',
  'backbone',
  'appChannel',
  'PatientView',
  'HomeView',
  'AboutView'
], function ($, _, Backbone, appChannel, PatientView, HomeView, AboutView) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.initialize = function () {
    var vent = appChannel.vent;
    this.listenTo(vent, 'route:home', this.showHome);
    this.listenTo(vent, 'route:about', this.showAbout);
    this.listenTo(vent, 'route:sign-in', this.signIn);
    this.listenTo(vent, 'route:sign-out', this.signOut);
  };

  protoProps.showPatient = function (patient) {
    patientView = new PatientView({model: patient});
    this.show(patientView);
  };

  protoProps.showHome = function () {
    this.show(new HomeView());
  };

  protoProps.showAbout = function () {
    this.show(new AboutView());
  };

  protoProps.signIn = function () {
    appChannel.vent.trigger('signin');
    appChannel.commands.execute('navigate', 'home', {trigger: true});
  };

  protoProps.signOut = function () {
    appChannel.vent.trigger('signout');
    appChannel.commands.execute('navigate', 'home', {trigger: true});
  };

  return Backbone.Marionette.Region.extend(protoProps, staticProps);
});
