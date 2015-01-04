define([
  'module_interfaces/jqueryCore'
], function ($) {
  'use strict';

  var nameSpace = 'vitalsTracker',
    pluginName = 'trackFocus',
    widgetName = nameSpace + '.' + pluginName;

  $.widget(widgetName, {
    options: {
      netFocus: 0
    },
    _create: function () {
      this._on({
        focusin: this._onFocusIn,
        focusout: this._onFocusOut
      });
      this._hasFocus = false;
    },
    _onFocusIn: function () {
      this.options.netFocus += 1;
      //console.log('netFocus: ' + this.options.netFocus);
      this.refresh();
    },
    _onFocusOut: function () {
      this.options.netFocus -= 1;
      //console.log('netFocus: ' + this.options.netFocus);
      this.refresh();
    },
    refresh: function () {
      var self = this,
        el = this.element;
      setTimeout(function () {
        var hadFocus = self._hasFocus,
          hasFocus = self._hasFocus = self.options.netFocus > 0;
        //console.log('hadFocus: ' + hadFocus);
        //console.log('hasFocus: ' + hasFocus);
        if (!hadFocus && hasFocus) {
          el.trigger('focusgained');
        } else if (hadFocus && !hasFocus) {
          el.trigger('focuslost');
        }
      }, 0);
    }
  });

  return $;
});
