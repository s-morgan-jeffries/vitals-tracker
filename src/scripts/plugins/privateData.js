define([
  'module_interfaces/jqueryCore'
], function ($) {
  'use strict';

  $.fn.privateData = function () {
    return $.dataPriv.get(this[0]);
  };

  $.fn.events = function () {
    return this.privateData().events;
  };

  return $;
});
