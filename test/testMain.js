var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base/src/scripts',

//  map: {
//    '*': {
//      message: 'mockMessage'
//    }
//  },
  paths: {
    backbone: '../bower_components/backbone/backbone',
    backbonePrivate: './lib/backbonePrivate',
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
    InputView: 'views/InputView',
    jquery: '../bower_components/jquery/dist/jquery',
    jqueryPrivate: './lib/jqueryPrivate',
    marionette: '../bower_components/marionette/lib/backbone.marionette',
    marionettePrivate: './lib/marionettePrivate',
    Measurement: 'models/measurement',
    measurementInputView: 'views/measurementInputView',
    MeasurementNew: 'views/MeasurementNew',
    moment: '../bower_components/moment/moment',
    Squire: '../../node_modules/squirejs/src/Squire',
    text: '../bower_components/text/text',
    vitalsMeasurement: 'models/vitalsMeasurement',
    vitalsMeasurements: 'collections/vitalsMeasurements',
    vitalsMeasurementView: 'views/vitalsMeasurementView',
    vitalsMeasurementsView: 'views/vitalsMeasurementsView',
    underscore: '../bower_components/underscore/underscore',
    'underscore.string': '../bower_components/underscore.string/lib/underscore.string',
    underscorePrivate: './lib/underscorePrivate'
  }

});


require(tests, function () {
  window.__karma__.start();
});