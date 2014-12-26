(function () {
  'use strict';

  // controller directory relative to RequireJS's base directory
  var controllerDir = 'controllers/',
    // controller files relative to the controller directory
    controllerFiles = [
      'home',
      'userHome',
      'about',
      'register',
      'login',
      'logout',
      'patientList',
      'patient'
    ],
    // list for module dependencies
    dependencies = ['auth'],
    i,
    len;

  // Iterate over the controller files, prefixing each with the controller directory string and adding it to the list of
  // dependencies.
  for (i = 0, len = controllerFiles.length; i < len; i++) {
    dependencies.push(controllerDir + controllerFiles[i]);
  }

  // The actual define function
  return define(dependencies, function () {

    // Export object for storing the named controllers
    var controllers = {},
      args = [].slice.call(arguments, 1),
      i,
      len;

    // Iterate over each controller file and store the corresponding controller function under that names in the object.
    for (i = 0, len = controllerFiles.length; i < len; i++) {
      controllers[controllerFiles[i]] = args[i];
    }

    return controllers;

  });
}());
