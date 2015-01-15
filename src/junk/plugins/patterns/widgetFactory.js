define([
  'module_interfaces/jqueryCore'
], function ($) {
  'use strict';

  $.widget('namespace.widgetName', {

    options: {
      someValue: null
    },

    _create: function () {

    },

    _destroy: function () {

    },
    methodB: function (event) {
      this._trigger('methodA', event, {
        someValue: this.options.someValue
      });
    },

    methodA: function (event) {
      this._trigger('dataChanged', event, {
        someValue: this.options.someValue
      });
    },

    _setOptions: function (key, value) {
      switch (key) {
        case 'someValue':
          this.options[key] = value;
          break;
        default:
          break;
      }
      $.Widget.prototype._setOptions.apply(this, arguments);
    }

  });

  return $;
});
