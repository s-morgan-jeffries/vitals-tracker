define([
  'jquery',
  'underscore',
  'backbone',
  'DummyLayoutView'
], function ($, _, Backbone, DummyLayoutView) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.initialize = function () {
    //var patient = new Patient({id: '12345'});
    //patientView = new PatientView({model: patient});
    //console.log('Content region initialized');
    this.listenTo(this, 'show:layout', this.showLayout);
  };

  protoProps.showLayout = function () {
    //patientView = new PatientView({model: patient});
    this.show((this.dummyLayoutView = new DummyLayoutView()));
  };

  return Backbone.Marionette.Region.extend(protoProps, staticProps);
});
