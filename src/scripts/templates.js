(function () {
  'use strict';

  // Template directory relative to RequireJS base directory
  var templateDir = '../templates/',
    // template files relative to template directory
    templateFiles = [
      'app.html',
      'app-header.html',
      'app-content.html',
      'app-footer.html',
      'pages/landing-page.html',
      'pages/register.html',
      'pages/login.html',
      'pages/about.html',
      'pages/user-home.html',
      'pages/patient-list.html',
      'pages/patient.html',
      'pages/logout.html',
      'partials/user-info.html',
      'partials/patient-list-item.html',
      'partials/measurement-show.html',
      'partials/measurement-edit-template.html',
      //'patient-template.html',
      'partials/measurements-table.html'
    ],
    // list for holding module dependencies
    dependencies = ['underscore'],
    i,
    len;

  // Iterate over the list and set the dependency names appropriately
  for (i = 0, len = templateFiles.length; i < len; i++) {
    dependencies.push('text!' + templateDir + templateFiles[i]);
  }

  return define(dependencies, function (_) {

    // export object for holding template functions
    var templates = {},
      // Arguments as list. This contains all the templates as strings. It drops the first argument, which is
      // underscore.
      templateArgs = [].slice.call(arguments, 1),
      i,
      len,
      templateName;

    // Iterate over the template files, convert each to a name by stripping the trailing '.html', and store the
    // corresponding template function under that names in the object.
    for (i = 0, len = templateFiles.length; i < len; i++) {
      templateName = templateFiles[i].replace('.html', '');
      templates[templateName] = _.template(templateArgs[i]);
    }

    return templates;
  });
}());
