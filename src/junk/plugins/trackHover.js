define([
  'module_interfaces/jqueryCore'
], function ($) {
  'use strict';

  var nameSpace = 'vitalsTracker',
    pluginName = 'trackHover',
    widgetName = nameSpace + '.' + pluginName;

  $.widget(widgetName, {
    options: {
      netHover: 0
    },
    _create: function () {
      console.log('creating trackHover');
      this._on({
        mouseenter: this._onMouseEnter,
        mouseleave: this._onMouseLeave
      });
      this.refresh();
    },
    refresh: function () {
      this.element.text(this.options.netHover);
      var netHover = this.options.netHover;
      if (!netHover) {
        this.element.trigger('nothover.hovertracker');
      }
    },
    _onMouseEnter: function () {
      this.options.netHover += 1;
      this.refresh();
    },
    _onMouseLeave: function () {
      this.options.netHover -= 1;
      this.refresh();
    },
    _destroy: function () {
      console.log('destroying trackHover');
    }
  });

  $.fn.privateData = function () {
    return $.dataPriv.get(this[0]);
  };

  return $;
});
