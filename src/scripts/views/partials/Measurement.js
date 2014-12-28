//var patient;
define([
  'views/View',
  'templates'
], function (View, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.template = templates['partials/measurement'];

  protoProps.initialize = function () {
    this.listenTo(this.model, 'change:isEditing', this.render);
  };

  protoProps.createPresenter = function () {
    return this.model.toPresenter();
  };

  protoProps.events = {
    dblclick: 'editMeasurement',
    'click .edit-measurement': 'editMeasurement',
    'click .delete-measurement': 'deleteMeasurement',
    'click .save-measurement': 'saveMeasurement',
    'click .cancel-edit': 'cancelEdit',
    'blur input': 'updateValue',
    focusin: 'onFocusIn',
    focusout: 'onFocusOut',
    focuslost: 'cancelEdit'
  };

  protoProps.onFocusIn = function () {
    this._netFocus += 1;
  };

  protoProps.onFocusOut = function () {
    this._netFocus -= 1;
    setTimeout(this.triggerFocusLost.bind(this), 0);
  };

  protoProps.triggerFocusLost = function () {
    if (this._netFocus === 0) {
      this.$el.trigger('focuslost');
    }
  };

  protoProps.editMeasurement = function () {
    this.model.set({isEditing: true});
    this._netFocus = 0;
  };

  protoProps.cancelEdit = function () {
    this.model.set({isEditing: false});
    this._netFocus = 0;
  };

  protoProps.deleteMeasurement = function () {
    console.log('delete measurement');
  };

  // t0d0: Add bootstrap-datetimepicker to the form (if you can't add it here, you'll need subviews)
  protoProps.updateValue = function (event) {
    console.log(event.target);
  };

  // t0d0: You want to get all the form's elements
  protoProps.saveMeasurement = function () {
    var formSelector = '#measurement-' + this.model.cid + '-form',
      $form = this.$(formSelector),
      formAttr = this.attributesFrom($form);
    console.log('save measurement');
    console.log(formAttr);
  };


  //protoProps.triggerFocusLost = function () {
  //  if (this.netFocus === 0) {
  //    this.trigger('focuslost:MeasurementEditView');
  //    console.log('focuslost:MeasurementEditView');
  //  }
  //};

  return View.extend(protoProps, staticProps);
});
