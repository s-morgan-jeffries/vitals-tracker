define([
  'module_interfaces/jqueryCore',
  'moment',
  'module_interfaces/bootstrap'
], function ($) {
  'use strict';

  var nameSpace = 'vitalsTracker',
    pluginName = 'dateTimePickerInput',
    widgetName = nameSpace + '.' + pluginName;

  $.widget(widgetName, {
    options: {

    },
    _create: function () {
      // For now, configuration is stored in the element's data
      var elemData = this.element.data(),
        options = this.options,
        // Initial value to use for the date
        initialVal = options.initialValue || new Date(elemData.initialValue),
        // Boolean indicating this should be a datePicker
        pickDate = options.pickDate || 'datePicker' in elemData,
        // Boolean indicating this should be a timePicker
        pickTime = options.pickTime || 'timePicker' in elemData;

      if ('format' in options) {
        this.element.data({dateFormat: options.format});
      }

      this.element.datetimepicker({
        pickDate: pickDate,
        pickTime: pickTime,
        // Be strict about validating dates
        useStrict: true
      });
      // Cache the picker
      this._picker = this.element.data('DateTimePicker');
      // Register a handler for the `change` event
      this._on({
        change: this._onChange
      });
      // The _on method doesn't handle namespacing correctly, so you have to do this manually.
      this.element.on({
        'dp.error': $.proxy(this._onError, this)
      });
      this.val(initialVal);
    },
    _destroy: function () {
      // And now we have to manually unregister the event
      this.element.off('dp.error', this._onError);
    },
    val: function (value) {
      if (arguments.length) {
        // If val is being called as a setter, set the _isSetting flag to true. This helps us ensure that this doesn't
        // trigger a `change` event.
        this._isSetting = true;
        // Rather than parsing the date directly, use the bootstrap.datetimepicker widget to do it.
        this._picker.setDate(value);
      } else {
        return this._value;
      }
    },
    _onChange: function (event) {
      if (this._isError) {
        // If this is an error, set the internal value to an invalid date.
        this._value = new Date(NaN);
        // Reset the flag
        this._isError = false;
      } else {
        // Otherwise, get the date from the picker
        this._value = this._picker.getDate().toDate();
      }
      if (this._isSetting) {
        // If we're setting this value ourselves, stop the `change` event from firing. This is consistent with the DOM
        // API's underlying behavior, where setting an element's value property doesn't trigger a change event.
        event.stopPropagation();
        // Reset the flag
        this._isSetting = false;
      }
    },
    // Set a flag indicating a dp.error error event was triggered
    _onError: function () {
      this._isError = true;
    }
  });

  return $;
});
