define([
  'module_interfaces/jqueryCore'
], function ($) {
  'use strict';

  var pluginName = 'defaultPluginName',
    defaults = {
      propertyName: 'value'
    };

  function Plugin (element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype.init = function () {
    this.isInitialized = true;
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };

  return $;
});
