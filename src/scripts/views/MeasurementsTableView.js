//var childView;

define([
  'backbone',
  'MeasurementEditView',
  'MeasurementShowView'
], function (Backbone, MeasurementEditView, MeasurementShowView) {
  'use strict';

  var instanceProps = {},
    staticProps = {};

  MeasurementShowView = MeasurementShowView.extend({
    triggers: {
      dblclick: 'toggleEdit'
    }
  });
  //MeasurementEditView = MeasurementEditView.extend({
  //  events: {
  //    blur: function () {
  //      console.log('blur!');
  //    }
  //  }
  //});

  instanceProps.getChildView = function () {
    return MeasurementShowView;
  };

  instanceProps.tagName = 'tbody';

  instanceProps.initialize = function () {
    this.render();
    this.listenTo(this.collection, 'sync', this.render);
  };

  instanceProps.childEvents = {
    toggleEdit: 'editItem'
  };

  instanceProps.editItem = function (measurementShowView) {
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

  return Backbone.Marionette.CollectionView.extend(instanceProps, staticProps);
});
