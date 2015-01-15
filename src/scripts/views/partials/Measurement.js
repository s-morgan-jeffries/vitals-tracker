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
    // Re-render any time the isEditing attribute changes.
    // dr0pped: Change this. isEditing is presentational logic. You should do this in the presenter, not the model.
    //    - This is going to great effort to adhere to some theoretical ideal. Because it's an attribute, isEditing gets
    //      hooked into Backbone's event system, which ends up being pretty crucial for how this is communicated across
    //      components.
    this.listenTo(this.model, 'change:isEditing', this.render);
    // Re-render the view on model sync
    this.listenTo(this.model, 'sync', this.render);
  };

  // Custom _createPresenter (just returns the model's presenter)
  protoProps._createPresenter = function () {
    return this.model.toPresenter();
  };

  // Custom _addPlugins method.
  protoProps._addPlugins = function () {
    // If we're not editing, there's no need to add any plugins.
    if (this.model.get('isEditing')) {
      // Cache references to the inputs. These get removed in the _onRemove method.
      var inputs = this.inputs = {},
        $newEl = this._$newEl,
        $inputs = inputs.$inputs = $newEl.find('input'),
        $measuredAtInputs = inputs.$measuredAtInputs = $inputs.filter('[name=measuredAt]'),
        $dateInput = inputs.$dateInput = $measuredAtInputs.filter('.date-picker-input'),
        $timeInput = inputs.$timeInput = $measuredAtInputs.filter('.time-picker-input'),
        $valueInputs = inputs.$valueInputs = $inputs.not('[type=datetime]'),
        $tempInput = $valueInputs.filter('[name=temperature]');

      // Add trackFocus behavior. This lets us keep track of whether the view currently has focus.
      $newEl.trackFocus();

      // Add bootstrap-datetime behavior.
      $dateInput.dateTimePickerInput({
        pickDate: true,
        format: 'MM/D/YYYY'
      });
      $timeInput.dateTimePickerInput({
        pickTime: true,
        format: 'h:mm A'
      });

      // Set up typedInput behavior
      $valueInputs.typedInput();

      // Give focus to the temperature.
      $tempInput.focus();
    }
    return this;
  };

  protoProps._onRender = function () {
    // Get the initial set of validated values. These are from the model, hence they're already validated.
    this._validatedValues = this._getModelValues();
    //console.log(this._validatedValues);
    return this;
  };

  protoProps._onRemove = function () {
    delete this.inputs;
    return this;
  };

  protoProps.events = {
    'click .edit-measurement': 'editMeasurement',
    'dblclick': 'editMeasurement',
    'click .delete-measurement': 'deleteMeasurement',
    'click .save-measurement': 'saveMeasurement',
    'keydown input': 'saveMeasurement',
    'click .cancel-edit': 'cancelEdit',
    'focuslost': 'cancelEdit',
    'blur input': 'validateValues'
  };

  // Setting isEditing to true leads to this being communicated across components
  protoProps.editMeasurement = function () {
    this.model.set({isEditing: true});
  };

  // Delete the measurement. By default, this removes the model from the collection, which will trigger a `remove`
  // event. That, in turn, will cause the MeasurementsTable view to re-render.
  protoProps.deleteMeasurement = function () {
    this.model.destroy();
  };

  //
  protoProps.saveMeasurement = function (event) {
    var ENTER = 13;
    // This gets triggered by keydown events and by clicking on the .save-measurement button. If it's the former, make
    // sure it was the enter key before we do anything.
    if (event.type === 'keydown' && event.which !== ENTER) {
      return;
    }

    // Check to make sure the input values will validate. If they don't, the validateValues method will handle
    // resetting them.
    if (this.validateValues()) {
      // This next block will remove anything from values that is the same as in the model. This won't minimize the
      // data we're sending over the wire (Backbone sends a complete representation of the model no matter what gets
      // changed), but it will prevent `change` events from being fired on attributes that aren't changing. The impetus
      // for this was that `change:measuredAt` was getting fired every time, which in turn caused the collection to
      // re-sort, which in turn caused the parent view (MeasurementsTable) to re-render, which is not very efficient.
      // Looking forward to implementing React views.

      // The current model values
      var modelValues = this._getModelValues(),
        // The current set of validated values. Since we just ran this.validateValues, these are the values we got from
        // the inputs.
        newValues = this._validatedValues,
        changedValues = {};
      // Iterate over the set of validated values and figure out to update the corresponding value in the changedValues
      // hash.
      _.forEach(newValues, function (val, key) {
        // If the value is undefined, we want the same value on the model to be unset. JSON serialization will remove
        // any properties that are set to undefined, so the server is never notified of the change. In order to unset
        // values on the server, we have to map those undefined values to null.
        if (_.isUndefined(val)) {
          changedValues[key] = null;
        // If a value isn't undefined, it has a value. The first part of this boolean checks to see if a value is
        // currently set to null. If it is, we want to overwrite it. If it isn't, we want to compare it to the new value
        // and add that to the changedValues hash if it has in fact changed. You have to use the valueOf method here
        // because some of the values are dates, which are objects, which will not be considered equal even if all of
        // their properties are equal.
        } else if (_.isNull(modelValues[key]) || (modelValues[key].valueOf() !== val.valueOf())) {
          changedValues[key] = val;
        }
      });

      // Set the isEditing flag to false. In the next step, this will be set (but not saved) on the model, which will
      // trigger the view to re-render.
      changedValues.isEditing = false;
      this.model.save(changedValues);
    }
  };

  protoProps.cancelEdit = function () {
    this.model.set({isEditing: false});
  };

  // Validate the current set of input values against the model
  protoProps.validateValues = function (/*event*/) {
    // So this is tricky, but this gets triggered by `change` events on the inputs. But it's a little more complicated
    // than that, because it's only those change events that bubble up to this.$el (where the `events` hash binds
    // events). Every time the template gets rendered as a form (when we're editing the value), there will be `change`
    // events on $newEl before this.$el is updated, because the template includes the initial values. I used to have a
    // check in here to make sure the view had fully rendered before this method could run, because the _getInputValues
    // method, which gets called here, assumes that the plugins have already been initialized. If they haven't been, we
    // get an error. That's no longer necessary, because now this method won't even be called until View#_updateElement
    // has been called, and that's the last step in rendering.

    // Get a hash of the current input values
    var values = this._getInputValues(),
      // Attempt to validate the values against the model
      validationError = this.model.validate(values);
    //console.log(values);
    //console.log(validationError);
    if (!validationError) {
      //console.log('validated okay');
      // If there's no error, update this._validatedValues
      this._validatedValues = values;
      // Return true to notify a caller that the values validated
      //return true;
    } else {
      // If there is a validation error, reset the input values to the last set of values stored in the hash. Since this
      // method gets called every time an input changes, and since this._validatedValues gets updated every time
      // validation passes, the only input value that will get changed here is the one that was just entered.
      // Also, you could use the validationError hash to set an error message here, but I'm not doing that yet.
      //this._setInputValues(this._validatedValues);
    }
    this._setInputValues(this._validatedValues);
    return !validationError;
  };

  // Set input values.
  protoProps._setInputValues = function (values) {
    var inputs = this.inputs,
      $inputs = inputs.$inputs,
      $measuredAtInputs = inputs.$measuredAtInputs;

    // If there's a value for measuredAt, set it
    if (values.measuredAt) {
      $measuredAtInputs.dateTimePickerInput('val', values.measuredAt);
    }
    // Iterate over the non-measuredAt values and set the corresponding input values
    $.each(_.omit(values, 'measuredAt'), function (key, val) {
      var $el = $inputs.filter('[name=' + key + ']');
      $el.typedInput('val', val);
    });
  };

  // Get a hash of the current input values
  protoProps._getInputValues = function () {
    // The plugins we're using on the inputs have get and set methods, and we use the get method to pull
    var $valueInputs = this.inputs.$valueInputs,
      values = {
        // Since measuredAt is spread out over two inputs, we have to use a special method to merge the two into one
        measuredAt: this._getMeasuredAt()
      };
    // Iterate over the other inputs and add their values to the hash
    $valueInputs.each(function () {
      var $el = $(this);
      values[$el.attr('name')] = $el.typedInput('instance').val();
    });
    return values;
  };

  // This gets the measuredAt values from the inputs and merges them into a single value.
  protoProps._getMeasuredAt = function () {
    var inputs = this.inputs,
      // The date input
      $dateInput = inputs.$dateInput,
      // The time input
      $timeInput = inputs.$timeInput,
      // The measuredAt date
      measuredAt = moment($dateInput.dateTimePickerInput('val')),
      // The measuredAt time
      measuredAtTime = moment($timeInput.dateTimePickerInput('val'));
    // Get the hour, minute, and second values from measuredAtTime and use those to set the same values for measuredAt
    measuredAt.hour(measuredAtTime.hour());
    measuredAt.minute(measuredAtTime.minute());
    measuredAt.second(measuredAtTime.second());
    // Convert the moment object to a date and return it
    return measuredAt.toDate();
  };

  protoProps._getModelValues = function () {
    return _.omit(this.model.attributes, this.model.stale, 'id');
  };

  return View.extend(protoProps, staticProps);
});
