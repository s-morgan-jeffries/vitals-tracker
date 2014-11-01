define([
  'underscore',
  'backbone',
  'moment',
  'templates'
], function (_, Backbone, moment, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.tagName = 'tr';

  protoProps.initialize = function () {
    Backbone.Courier.add(this);
    this.listenTo(this, 'measurement:edit', function () {
      console.log('measurement:edit');
    });
  };

  protoProps.template = function (serializedModel) {
    var defaults = {
        temperature: null,
        pulse: null,
        sbp: null,
        dbp: null,
        respirations: null,
        saturation: null
      },
      data;
    _.each(['createdAt', 'updatedAt', 'measuredAt'], function (attr) {
      if (serializedModel[attr]) {
        serializedModel[attr] = moment(serializedModel[attr]);
      }
    });
    data = _.defaults({}, serializedModel, defaults);
    return templates.measurementShow(data);
  };

  protoProps.deleteMeasurement = function () {
    this.model.destroy();
  };

  protoProps.editMeasurement = function () {
    //console.log('measurement:edit');
    this.spawn('measurement:edit');
  };


  protoProps.events = {
    'click .measurement-delete': 'deleteMeasurement',
    'click .measurement-edit': 'editMeasurement',
    'dblclick': 'editMeasurement'
  };


  return Backbone.Marionette.ItemView.extend(protoProps, staticProps);
});
