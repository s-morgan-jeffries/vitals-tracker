(function () {
  'use strict';

  var templateDir = '../templates/',
    templateFiles = [
      'measurement-show-template.html',
      'measurement-edit-template.html',
      'header-template.html',
      'footer-template.html',
      'patient-template.html',
      'measurements-table.html',
      'dummy-layout.html',
      'dummy-item-1.html',
      'about.html',
      'dummy-item-1.html'
    ],
    dependencies = ['underscore'],
    i,
    len;

  for (i = 0, len = templateFiles.length; i < len; i++) {
    dependencies.push('text!' + templateDir + templateFiles[i]);
  }

  return define(dependencies, function (_,
                                        MeasurementShowTemplate,
                                        MeasurementEditTemplate,
                                        HeaderTemplate,
                                        FooterTemplate,
                                        PatientTemplate,
                                        MeasurementsTableTemplate,
                                        DummyLayoutTemplate,
                                        DummyItem1Template,
                                        //HomeTemplate,
                                        AboutTemplate
  ) {

    var templates = {
      MeasurementShow: _.template(MeasurementShowTemplate),
      MeasurementEdit: _.template(MeasurementEditTemplate),
      Header: _.template(HeaderTemplate),
      Footer: _.template(FooterTemplate),
      Patient: _.template(PatientTemplate),
      MeasurementsTable: _.template(MeasurementsTableTemplate),
      DummyLayout: _.template(DummyLayoutTemplate),
      DummyItem1: _.template(DummyItem1Template),
      //Home: _.template(HomeTemplate),
      About: _.template(AboutTemplate)
    };

    var templateArgs = [].slice.call(arguments, 1);
    for (var i = 0, len = templateFiles.length; i < len; i++) {
      var templateName = templateFiles[i].replace('.html', '');
      templates[templateName] = templateArgs[i];
    }

    return templates;
  });
}());
