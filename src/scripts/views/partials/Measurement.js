//var patient;
define([
  'views/View',
  'templates',
  'moment'
], function (View, templates, moment) {
  'use strict';

  var protoProps = {},
    staticProps = {},
    $ = View.$;

  protoProps.template = templates['partials/measurement'];

  protoProps.initialize = function () {
    this.listenTo(this.model, 'change:isEditing', this.render);
  };

  protoProps.createPresenter = function () {
    return this.model.toPresenter();
  };

  protoProps.addPlugins = function () {
    if (this.model.get('isEditing')) {
      // Test for whether we've rendered yet. If not, add the trackFocus plugin to the top-level element.
      if (!(this.hasRendered)) {
        this.$el.trackFocus();
      }
      var $inputs = this.$('input'),
        $dateTimeInputs = $inputs.filter('[type=datetime]'),
        $valueInputs = $inputs.not('[type=datetime]'),
        $tempInput = $valueInputs.filter('[name=temperature]');

      // Add bootstrap-datetime behavior.
      $dateTimeInputs.dateTimeInput();

      // Set up smartInput behavior
      $valueInputs.smartInput();

      // Give focus to the temperature.
      $tempInput.focus();

      //t0d0: Move this
      this._validatedValues = this.model.toJSON();
    }
    return this;
  };

  protoProps.events = {
    'click .edit-measurement': 'editMeasurement',
    'dblclick': 'editMeasurement',
    'click .delete-measurement': 'deleteMeasurement',
    'click .save-measurement': 'saveMeasurement',
    'click .cancel-edit': 'cancelEdit',
    //'focuslost': 'cancelEdit',
    'change input': 'updateValues'
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

  protoProps.updateValues = function (/*event*/) {
    if (!this.pluginsAdded) {
      return;
    }
    var values = this.getInputValues();
    console.log(values);
    var validationError = this.model.validate(values);
    console.log(validationError);
    if (!validationError) {
      this._validatedValues = values;
    } else {
      this.setInputValues(this._validatedValues);
    }
  };

  protoProps.setInputValues = function () {};

  protoProps.getMeasuredAt = function () {
    var $dateTimeInputs = this.$('input').filter('[type=datetime]'),
      $dateInput = $dateTimeInputs.filter(function () {
        return 'datePicker' in $(this).data();
      }),
      $timeInput = $dateTimeInputs.filter(function () {
        return 'timePicker' in $(this).data();
      }),
      measuredAt = moment($dateInput.dateTimeInput('get')),
      measuredAtTime = moment($timeInput.dateTimeInput('get'));
    measuredAt.hour(measuredAtTime.hour());
    measuredAt.minute(measuredAtTime.minute());
    measuredAt.second(measuredAtTime.second());
    return measuredAt.toDate();
  };

  protoProps.getInputValues = function () {
    var $inputs = this.$('input'),
      //$dateTimeInputs = $inputs.filter('[type=datetime]'),
      $valueInputs = $inputs.not('[name=measuredAt]'),
      values = {
        measuredAt: this.getMeasuredAt()
      };
    $valueInputs.each(function () {
      var $el = $(this);
      values[$el.attr('name')] = $el.smartInput('get');
    });
    return values;
  };

  // t0d0: You want to get all the form's elements
  protoProps.saveMeasurement = function () {
    var formSelector = '#measurement-' + this.model.cid + '-form',
      $form = this.$(formSelector),
      formAttr = this.attributesFrom($form);
    console.log('save measurement');
    console.log(formAttr);
  };

  return View.extend(protoProps, staticProps);
});
