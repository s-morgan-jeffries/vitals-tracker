define([
  'module_interfaces/jqueryCore'
], function ($) {
  'use strict';

  var nameSpace = 'vitalsTracker',
    pluginName = 'typedInput',
    widgetName = nameSpace + '.' + pluginName;

  var identity = function (val) {
    return val;
  };

  var types = {};
  types.number = {
    parse: function (valStr, el) {
      // If the element's validity.valid is set to false, return NaN. You have to do it this way because if there's a
      // non-parsable string in the input, its value will be an empty string, and there's no way to access the raw value
      // in JavaScript.
      // Incidentally, this relies on the browser's own validation, so you need to use HTML attributes on the input to
      // ensure it's being handled correctly. As an example, the allowable step between numbers is 1 by default, so if
      // you try to use decimals without specifying a different step value in HTML, you'll get an error here.
      if (!el.validity.valid) {
        //console.log('invalid!');
        return NaN;
      }
      // If valStr is not empty, try to convert it to a number (which will return NaN if it can't be parsed); otherwise,
      // return undefined.
      return valStr.length ? +valStr : void 0;
    },
    convert: function (val) {
      // Check whether val is undefined. If not, continue. If it is, this implicitly returns undefined.
      if (val !== void 0) {
        if (typeof val === 'number') {
          // If val is a number, return it
          return val;
        }
        // Otherwise, return NaN
        return NaN;
      }
    }
  };

  // This widget should take a regular input and convert it to a typed input. It should maintain its own representation
  // of its typed value and should keep the displayed value in sync with that. If the displayed value changed last, the
  // model should be updated to reflect that; if the model changed last, the displayed value will be updated. There
  // isn't necessarily a one-to-one relationship between model values and displayed values. For example, for a
  // numerically-typed input, any string that can't be parsed to a number will be represented by NaN.
  $.widget(widgetName, {
    options: {

    },
    _create: function () {
      // Get the type from the options or, failing that, from the type attribute
      var typeName = this.options.type || this.element.attr('type'),
        typeFunctions = typeName && types[typeName];
      // The parser. Use the identity function by default.
      this._parse = (typeFunctions && typeFunctions.parse) || identity;
      // The converter. Use the identity function by default.
      this._convert = (typeFunctions && typeFunctions.convert) || identity;
    },
    // Use the same interface as jQuery
    val: function (value) {
      if (arguments.length) {
        // If an argument was provided, execute setter logic. Convert the raw value to a typed value using  the
        // converter function, then use that to update the input's value. Based on experimentation, this does not
        // trigger a `change` event.
        this.element.val(this._convert(value));
      } else {
        // Otherwise, it's a getter, so just return the current parsed value.
        return this._parse(this.element.val(), this.element[0]);
      }
    }
  });

  return $;
});
