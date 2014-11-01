requirejs.config({
  config: {
    moment: {
      noGlobal: true
    }
  },
  // Add this map config in addition to any baseUrl or
  // paths config you may already have in the project.
  map: {
    // '*' means all modules will get 'jquery-private'
    // for their 'jquery' dependency.
    '*': {
      backbone: 'backbonePrivate',
      jquery: 'jqueryPrivate',
      marionette: 'marionettePrivate',
      underscore: 'underscorePrivate'
    },
    // 'jquery-private' wants the real jQuery module
    // though. If this line was not here, there would
    // be an unresolvable cyclic dependency.
//    'backbone.dualstorage': {
//      backbone: 'backbone'
//    },
    'backbone.courier': {
      backbone: 'backbone'
    },
    'backbone.forms': {
      backbone: 'backbone'
    },
    'backbone.localstorage': {
      backbone: 'backbone'
    },
    'backbone.validation': {
      backbone: 'backbone'
    },
    backbonePrivate: {
      backbone: 'backbone'
    },
    marionette: {
      backbone: 'backbone'
    },
    marionettePrivate: {
      marionette: 'marionette'
    },
    jqueryPrivate: {
      jquery: 'jquery'
    },
    'underscore.string': {
      underscore: 'underscore'
    },
    underscorePrivate: {
      underscore: 'underscore'
    }
  },
//  packages: [
//    {
//      name: 'color',
//      main: 'color',
//      location: './lib/color'
//    },
//    {
//      name: 'color-convert',
//      main: 'index',
//      location: './lib/color/node_modules/color-convert'
//    },
//    {
//      name: 'color-string',
//      main: 'color-string',
//      location: './lib/color/node_modules/color-string'
//    }
//  ],
  paths: {
    backbone: '../bower_components/backbone/backbone',
    backbonePrivate: './lib/backbonePrivate',
    'backbone.courier': '../bower_components/backbone.courier/dist/backbone.courier',
    'backbone.localstorage': '../bower_components/backbone.localstorage/backbone.localStorage',
    'backbone.forms': '../bower_components/backbone-forms/distribution.amd/backbone-forms',
    'backbone.validation': '../bower_components/backbone-validation/dist/backbone-validation-amd',
    bootstrap: './lib/bootstrap',
    'bootstrap.affix': '../bower_components/bootstrap-stylus/js/affix',
    'bootstrap.alert': '../bower_components/bootstrap-stylus/js/alert',
    'bootstrap.button': '../bower_components/bootstrap-stylus/js/button',
    'bootstrap.carousel': '../bower_components/bootstrap-stylus/js/carousel',
    'bootstrap.collapse': '../bower_components/bootstrap-stylus/js/collapse',
    'bootstrap.dropdown': '../bower_components/bootstrap-stylus/js/dropdown',
    'bootstrap.modal': '../bower_components/bootstrap-stylus/js/modal',
    'bootstrap.popover': '../bower_components/bootstrap-stylus/js/popover',
    'bootstrap.scrollspy': '../bower_components/bootstrap-stylus/js/scrollspy',
    'bootstrap.tab': '../bower_components/bootstrap-stylus/js/tab',
    'bootstrap.tooltip': '../bower_components/bootstrap-stylus/js/tooltip',
    'bootstrap.transition': '../bower_components/bootstrap-stylus/js/transition',
    'bootstrap-datetimepicker': '../bower_components/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker',
    customParsers: 'mixins/customParsers',
//    customSanitizers: 'mixins/customSanitizers',
    customValidators: 'mixins/customValidators',
    DatePickerView: 'views/DatePickerView',
    DatePickerViewOrig: 'views/DatePickerViewOrig',
    InputView: 'views/InputView',
    InputViewOrig: 'views/InputViewOrig',
    jquery: '../bower_components/jquery/dist/jquery',
//    jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
    jqueryPrivate: './lib/jqueryPrivate',
    marionette: '../bower_components/marionette/lib/backbone.marionette',
    marionettePrivate: './lib/marionettePrivate',
    Measurement: 'models/Measurement',
    Measurements: 'collections/Measurements',
//    measurementInputView: 'views/measurementInputView',
    MeasurementEditView: 'views/MeasurementEditView',
    MeasurementEditViewOrig: 'views/MeasurementEditViewOrig',
    MeasurementShowView: 'views/MeasurementShowView',
    MeasurementsTableView: 'views/MeasurementsTableView',
    moment: '../bower_components/moment/moment',
    Patient: 'models/Patient',
    PatientView: 'views/PatientView',
//    momentPrivate: './lib/jqueryPrivate',
    sinon: '../bower_components/sinonjs/sinon',
    text: '../bower_components/text/text',
    TimePickerView: 'views/TimePickerView',
    TimePickerViewOrig: 'views/TimePickerViewOrig',
//    vitalsMeasurement: 'models/vitalsMeasurement',
    vitalsMeasurements: 'collections/vitalsMeasurements',
    vitalsMeasurementView: 'views/vitalsMeasurementView',
    vitalsMeasurementsView: 'views/vitalsMeasurementsView',
//    todoView: 'views/todoView',
//    todosView: 'views/todosView',
    underscore: '../bower_components/underscore/underscore',
    'underscore.string': '../bower_components/underscore.string/lib/underscore.string',
    underscorePrivate: './lib/underscorePrivate'

  },
  // So all this does is delay the loading of these files until jQuery loads. Meaning the tags shouldn't get appended
  // to head until jQuery is registered. By logging document.head.lastChild in the define function for jqueryPrivate,
  // you can see that that's the case. The lastChild at that point is the Backbone script tag, whereas in the final
  // version of the page, it's the bootstrap scripts.
  shim: {
    'bootstrap.affix': { deps: ['jquery'] },
    'bootstrap.alert': { deps: ['jquery'] },
    'bootstrap.button': { deps: ['jquery'] },
    'bootstrap.carousel': { deps: ['jquery'] },
    'bootstrap.collapse': { deps: ['jquery'] },
    'bootstrap.dropdown': { deps: ['jquery'] },
    'bootstrap.modal': { deps: ['jquery'] },
    'bootstrap.popover': { deps: ['jquery', 'bootstrap.tooltip'] },
    'bootstrap.scrollspy': { deps: ['jquery'] },
    'bootstrap.tab': { deps: ['jquery'] },
    'bootstrap.tooltip': { deps: ['jquery'] },
    'bootstrap.transition': { deps: ['jquery'] }
//    ,
//    sinon: {deps: []}
  }
});

require(['app'], function (app) {
  'use strict';

  app.start();
});

//require(['sinon'], function () {
//  'use strict';
//});
//
//var Measurement, measurements;
//require(['Measurement', 'Measurements'], function (MeasurementModule, MeasurementsModule) {
//  'use strict';
//  Measurement = MeasurementModule;
//  measurements = new MeasurementsModule([], {collectionName: 'toyMeasurements'});
//  measurements.fetch();
//});
