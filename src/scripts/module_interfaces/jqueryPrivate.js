define([
  'module_interfaces/jqueryCore',
  'module_interfaces/bootstrap',
  //'bootstrap.affix',
  //'bootstrap.alert',
  //'bootstrap.button',
  //'bootstrap.carousel',
  //'bootstrap.collapse',
  //'bootstrap.dropdown',
  //'bootstrap.modal',
  //'bootstrap.popover',
  //'bootstrap.scrollspy',
  //'bootstrap.tab',
  //'bootstrap.tooltip',
  //'bootstrap.transition',
  //'bootstrap-datetimepicker',
  //'plugins/trackFocus',
  //'plugins/parseValue',
  'plugins/index'
], function ($) {
  'use strict';

  //console.log('jqueryPrivate');
  // As it stands, this does nothing. You could use jQuery.noConflict() to delete the global reference to jQuery.
  // Right now, Bootstrap requires me to use the global jQuery object.
  return $;
});
