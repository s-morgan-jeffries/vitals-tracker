define([
  '../../../bower_components/backbone/backbone',
  'MeasurementEditView',
  'MeasurementShowView'
], function (Backbone, MeasurementEditView, MeasurementShowView) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.getChildView = function () {
    return MeasurementShowView;
  };

  protoProps.tagName = 'tbody';

  protoProps.initialize = function () {
    Backbone.Courier.add(this);
    this.render();
    this.listenTo(this.collection, 'sync', this.render);
  };

  protoProps.childEvents = {
    toggleEdit: 'editItem'
  };

  protoProps.editItem = function (measurementShowView) {
    var model = measurementShowView.model,
      measurementEditView = new MeasurementEditView({model: model});

    var onModelUpdated = function () {
      this.stopListening(measurementEditView, 'modelUpdated');
      measurementEditView.close();
      model.save();
    };

    this.listenTo(measurementEditView, 'modelUpdated', onModelUpdated);

    measurementEditView.render();
    measurementShowView.$el.replaceWith(measurementEditView.el);
    measurementShowView.close();
  };

  protoProps.editMeasurement = function (data, measurementShowView) {
    var model = measurementShowView.model,
      measurementEditView = new MeasurementEditView({model: model});

    this.listenToOnce(measurementEditView, 'measurement:submit', function () {
      measurementEditView.destroy();
      model.save();
    });

    measurementEditView.render();
    measurementShowView.$el.replaceWith(measurementEditView.el);
    measurementShowView.destroy();
  };

  protoProps.onMessages = {
    'measurement:edit': 'editMeasurement'
  };

  return Backbone.Marionette.CollectionView.extend(protoProps, staticProps);
});
