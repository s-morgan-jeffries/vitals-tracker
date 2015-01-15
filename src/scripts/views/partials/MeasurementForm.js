var measurementForm;
define([
  'underscore',
  'views/View',
  'templates'
], function (_, View, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {},
    $ = View.$;

  protoProps.template = templates['partials/measurement-form'];

  protoProps.initialize = function () {
    var Model = this.collection.model;
    this.model = new Model();
    measurementForm = this;
  };

  // t0d0: Update this so it caches the widgets (and the inputs if it needs to)
  // Custom _addPlugins method.
  protoProps._addPlugins = function () {
    // Cache references to the inputs. These get removed in the _onRemove method.
    var inputs = this.inputs = {},
      $newEl = this._$newEl,
      $inputs = inputs.$inputs = $newEl.find('input'),
      $measuredAtInput = inputs.$measuredAtInput = $inputs.filter('[name=measuredAt]'),
      $valueInputs = inputs.$valueInputs = $inputs.not('[name=measuredAt]');

    // Add bootstrap-datetime behavior.
    $measuredAtInput
      .dateTimePickerInput({
        pickDate: true,
        pickTime: true,
        format: 'MM/D/YYYY h:mm A'
      });

    // Set up typedInput behavior
    $valueInputs.typedInput();

    return this;
  };

  protoProps._onRender = function () {
    // Just call the resetForm method, then return the view
    this.resetForm();
    return this;
  };

  protoProps._onRemove = function () {
    delete this.inputs;
    return this;
  };

  protoProps.events = {
    'blur input': 'validateValues',
    'submit form': 'submitForm',
    'reset form': 'resetForm'
  };

  // Validate the current set of input values against the model
  protoProps.validateValues = function () {
    // Get a hash of the current input values
    var values = this._getInputValues(),
    // Attempt to validate the values against the model
      validationError = this.model.validate(values);
    // If there's no validation error, update this._validatedValues
    if (!validationError) {
      // Map undefined to null for every key in values
      _.each(values, function (val, key) {
        if (_.isUndefined(val)) {
          values[key] = null;
        }
      });
      // Update this._validatedValues
      this._validatedValues = values;
    }
    // Set the value of the inputs with whatever is in this._validatedValues. If this._validatedValues wasn't updated,
    // this resets the form to the last set of validatedValues. If it was, this ensures that the displayed values match
    // the typed values returned from the typedInput plugin. Honestly, though, I'm not sure if that's necessary. The
    // typedInput plugin applied to a number input should return an invalid value for non-numeric input values.
    this._setInputValues(this._validatedValues);
    return !validationError;
  };

  protoProps.submitForm = function (event) {
    // Prevent the form submission
    event.preventDefault();
    // Check to make sure the input values will validate. If they don't, the validateValues method will handle
    // resetting them.
    if (this.validateValues()) {
      // Create a new measurement from the values in the form
      this.collection.create(this._validatedValues);
      // Reset the form
      this.resetForm();
    }
  };

  protoProps.resetForm = function (event) {
    // Reset validatedValues
    var newValues = this._validatedValues = {},
    // Get current values from the form
      currentValues = this._getInputValues();

    // Explicitly set every key in newValues to null
    _.each(currentValues, function (val, key) {
      newValues[key] = null;
    });
    // Set the measuredAt value to the current datetime
    newValues.measuredAt = new Date();

    // Reset the values in the form
    this._setInputValues(newValues);

    // Give focus to the temperature
    this.inputs.$valueInputs
      .filter('[name=temperature]')
      .focus()
    ;

    // If this is an event, prevent the default action
    if (event) {
      event.preventDefault();
    }
  };

  // Set input values.
  protoProps._setInputValues = function (values) {
    var inputs = this.inputs,
      $inputs = inputs.$inputs,
      $measuredAtInput = inputs.$measuredAtInput;

    // If there's a value for measuredAt, set it
    if (values.measuredAt) {
      $measuredAtInput.dateTimePickerInput('val', values.measuredAt);
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
    var inputs = this.inputs,
      $measuredAtInput = inputs.$measuredAtInput,
      $valueInputs = inputs.$valueInputs,
      values = {
        measuredAt: $measuredAtInput.dateTimePickerInput('val')
      };

    // Iterate over the other inputs and add their values to the hash
    $valueInputs.each(function () {
      var $el = $(this);
      // Okay, so this is one of the idiosyncrasies of jQuery's widget builder. If you call a method using the command
      // pattern, and that method returns undefined, the command will return the jQuery object with which the widget is
      // associated. So if you want to call a method that might return undefined, and if undefined is an allowed value,
      // you should call the `instance` method first to get the widget, then call the method on that.
      values[$el.attr('name')] = $el.typedInput('instance').val();
    });
    return values;
  };

  return View.extend(protoProps, staticProps);
});
