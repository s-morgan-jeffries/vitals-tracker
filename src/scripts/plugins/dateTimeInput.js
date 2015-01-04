define([
  'module_interfaces/jqueryCore',
  'moment',
  'module_interfaces/bootstrap'
], function ($) {
  'use strict';

  var nameSpace = 'vitalsTracker',
    pluginName = 'dateTimeInput',
    widgetName = nameSpace + '.' + pluginName;

  $.widget(widgetName, {
    options: {

    },
    _create: function () {
      var elemData = this.element.data(),
        initialVal = elemData.initialValue,
        pickDate = 'datePicker' in elemData,
        pickTime = 'timePicker' in elemData;

      this.element.datetimepicker({
        pickDate: pickDate,
        pickTime: pickTime,
        useStrict: true
      });
      this._picker = this.element.data('DateTimePicker');
      this._on({
        change: this._onChange
      });
      this.element.on({
        'dp.error': $.proxy(this._onError, this)
      });
      this.set(new Date(initialVal));
    },
    _destroy: function () {
      this.element.off('dp.error', this._onError);
    },
    get: function () {
      return this._picker.getDate().toDate();
    },
    set: function (value) {
      if (this._isValid(value)) {
        this._picker.setDate(value);
      }
    },
    _isValid: function (value) {
      return value instanceof Date;
    },
    _updateCachedVal: function () {
      this._cachedVal = this.get();
    },
    _revertToCachedVal: function () {
      this.set(this._cachedVal);
    },
    _onChange: function (event) {
      if (this._isError) {
        event.stopPropagation();
        this._isError = false;
        this._isResetting = true;
        this._revertToCachedVal();
      } else if (this._isResetting) {
        this._isResetting = false;
        event.stopPropagation();
      } else {
        this._updateCachedVal();
      }
    },
    _onError: function () {
      this._isError = true;
    }
  });

  return $;
});
