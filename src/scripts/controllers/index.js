(function () {
  'use strict';

  var controllerFiles = [],
    controllerDir = 'controllers/',
    dependencies = [],
    i,
    len;

  for (i = 0, len = controllerFiles.length; i < len; i++) {
    dependencies.push(controllerDir + controllerFiles[i]);
  }

  // The actual define function
  return define([dependencies], function () {

    var controllers = {},
      i,
      len;

    // There's one dependency for each controller file, and so one argument for each controller file.
    for (i = 0, len = controllerFiles.length; i < len; i++) {
      controllers[controllerFiles[i]] = arguments[i];
    }

    return controllers;

  });
}());
