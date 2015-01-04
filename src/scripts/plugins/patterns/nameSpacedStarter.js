define([
  'module_interfaces/jqueryCore'
], function ($) {
  'use strict';

  var nameSpace = 'myNamespace',
    pluginName = 'myPluginName';

  if (!$[nameSpace]) {
    $[nameSpace] = {};
  }

  // This isn't exactly the same as what the widget factory does. The argument order for that is 1)options, and
  // 2)element. It's not even clear to me what myFunctionParam is.
  $[nameSpace][pluginName] = function (el, myFunctionParam, options) {
    var base = this;
    base.$el = $(el);
    base.el = el;
    base.$el.data(nameSpace + '.' + pluginName, base);
    base.init = function () {
      // What is this?
      base.myFunctionParam = myFunctionParam;
      base.options = $.extend({}, $[nameSpace][pluginName].defaultOptions, options);
    };
    base.init();
  };

  $[nameSpace][pluginName].defaultOptions = {
    myDefaultValue: ''
  };

  $.fn[nameSpace + '_' + pluginName] = function (myFunctionParam, options) {
    return this.each(function () {
      new ($[nameSpace][pluginName])(this, myFunctionParam, options);
    });
  };

  return $;
});
