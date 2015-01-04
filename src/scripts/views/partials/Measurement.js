//var patient;
define([
  'underscore',
  'views/View',
  'templates',
  'moment'
], function (_, View, templates, moment) {
  'use strict';

  var protoProps = {},
    staticProps = {},
    $ = View.$;

  protoProps.template = templates['partials/measurement'];

  protoProps.initialize = function () {
    this.listenTo(this.model, 'change:isEditing', this.render);
    this.listenTo(this.model, 'sync', this.render);
  };

  protoProps.createPresenter = function () {
    return this.model.toPresenter();
  };

  protoProps.addPlugins = function () {
    // Test for whether we've rendered yet. If not, add the trackFocus plugin to the top-level element.
    if (!(this.hasRendered)) {
      this.$el.trackFocus();
    }
    if (this.model.get('isEditing')) {
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
      this._validatedValues = this.getModelValues();
    }
    return this;
  };

  protoProps.getModelValues = function () {
    var values = _.omit(this.model.attributes, this.model.stale);
    return _.omit(values, 'id');
  };

  protoProps.events = {
    'click .edit-measurement': 'editMeasurement',
    'dblclick': 'editMeasurement',
    'click .delete-measurement': 'deleteMeasurement',
    'click .save-measurement': 'saveMeasurement',
    'keydown input': 'saveMeasurement',
    'click .cancel-edit': 'cancelEdit',
    'focuslost': 'cancelEdit',
    'change input': 'updateValues'
  };

  protoProps.editMeasurement = function () {
    this.model.set({isEditing: true});
  };

  protoProps.cancelEdit = function () {
    this.model.set({isEditing: false});
  };

  protoProps.deleteMeasurement = function () {
    console.log('delete measurement');
    this.model.destroy();
  };

  protoProps.updateValues = function (/*event*/) {
    if (!this.pluginsAdded) {
      return;
    }
    var values = this.getInputValues(),
      validationError = this.model.validate(values);
    //console.log(validationError);
    if (!validationError) {
      this._validatedValues = values;
      return true;
    } else {
      this.setInputValues(this._validatedValues);
    }
  };

  protoProps.setInputValues = function (values) {
    //console.log(values);
    var $inputs = this.$('input'),
      $measuredAtInputs = $inputs.filter('[name=measuredAt]');

    if (values.measuredAt) {
      $measuredAtInputs.dateTimeInput('set', values.measuredAt);
    }
    $.each(_.omit(values, 'measuredAt'), function (key, val) {
      var $el = $inputs.filter('[name=' + key + ']');
      $el.smartInput('set', val);
    });
  };

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
  protoProps.saveMeasurement = function (event) {
    //console.log('save measurement');
    //console.log(event);
    var ENTER = 13;
    if (event.type === 'keydown' && event.which !== ENTER) {
      return;
    }

    if (this.updateValues()) {
      // Remove anything from values that is the same as in the model
      var modelValues = _.omit(this.model.attributes, this.model.stale),
        newValues = this._validatedValues,
        changedValues = {};
      _.forEach(newValues, function (val, key) {
        //console.log(key);
        //console.log(val);
        //console.log(modelValues[key]);
        if (modelValues[key].valueOf() !== val.valueOf()) {
          changedValues[key] = val;
        }
      });
      //console.log(changedValues);
      //var values = $.extend({isEditing: false}, changedValues);
      changedValues.isEditing = false;
      this.model.save(changedValues);
    }
  };

  return View.extend(protoProps, staticProps);
});
