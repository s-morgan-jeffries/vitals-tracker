define([
  'module_interfaces/jqueryCore'
], function ($) {
  'use strict';

  var nameSpace = 'vitalsTracker',
    pluginName = 'smartInput',
    widgetName = nameSpace + '.' + pluginName;

  var identity = function (val) {
    return val;
  };

  var returnTrue = function () {
    return true;
  };

  var parsers = {
    number: function (valueStr) {
      //var validity = $el[0].validity;
      //// If there's a validity object and this is a badInput
      //if (validity && validity.badInput) {
      //  return NaN;
      //}
      return valueStr.length ? +valueStr : void 0;
    }
  };

  var validators = {
    number: function (val) {
      return (typeof val === 'number') && !isNaN(val);
    }
  };

  $.widget(widgetName, {
    options: {

    },
    _create: function () {
      var typeName = this.element.attr('type');
      this._parser = (typeName && parsers[typeName]) || identity;
      this._validator = (typeName && validators[typeName]) || returnTrue;
      this._on({
        change: this._onChange
      });
      this._update();
    },
    // No side effects
    get: function () {
      var rawVal = this.element.val(),
        parser = this._parser,
        $el = this.element;
      return parser(rawVal, $el);
    },

    set: function (value) {
      if (this._isValid(value)) {
        this.element.val(value);
        this._updateCachedVal();
      }
    },
    _isValid: function (value) {
      return this._validator(value);
    },
    _update: function () {
      var newVal = this.get();
      if (this._isValid(newVal)) {
        this.element.val(newVal);
        this._updateCachedVal();
        return true;
      } else {
        this._revertToCachedVal();
      }
    },
    _updateCachedVal: function () {
      var currentVal = this.get();
      this._cachedVal = currentVal;
    },
    _revertToCachedVal: function () {
      this.set(this._cachedVal);
    },
    _onChange: function (event) {
      if (!this._update()) {
        event.stopPropagation();
      }
    }
  });

  return $;
});
