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
      backbone: 'module_interfaces/backbonePrivate',
      d3: 'module_interfaces/d3Private',
      jquery: 'module_interfaces/jqueryPrivate',
      //jqueryCore: 'module_interfaces/jqueryCore',
      rickshaw: 'module_interfaces/rickshawPrivate',
      //marionette: 'module_interfaces/marionettePrivate',
      //showdown: 'module_interfaces/showdownPrivate',
      underscore: 'module_interfaces/underscorePrivate'
    },
    // 'jquery-private' wants the real jQuery module
    // though. If this line was not here, there would
    // be an unresolvable cyclic dependency.
//    'backbone.dualstorage': {
//      backbone: 'backbone'
//    },
//    'backbone.courier': {
//      backbone: 'backbone'
//    },
//    'backbone.forms': {
//      backbone: 'backbone'
//    },
    'backbone.DOMStorage': {
      backbone: 'backbone'
    },
    'bootstrap.affix': {
      jquery: 'jquery'
    },
    'bootstrap.alert': {
      jquery: 'jquery'
    },
    'bootstrap.button': {
      jquery: 'jquery'
    },
    'bootstrap.carousel': {
      jquery: 'jquery'
    },
    'bootstrap.collapse': {
      jquery: 'jquery'
    },
    'bootstrap.dropdown': {
      jquery: 'jquery'
    },
    'bootstrap.modal': {
      jquery: 'jquery'
    },
    'bootstrap.popover': {
      jquery: 'jquery'
    },
    'bootstrap.scrollspy': {
      jquery: 'jquery'
    },
    'bootstrap.tab': {
      jquery: 'jquery'
    },
    'bootstrap.tooltip': {
      jquery: 'jquery'
    },
    'bootstrap.transition': {
      jquery: 'jquery'
    },
    'bootstrap-datetimepicker': {
      jquery: 'jquery'
    },
    //'backbone.localstorage': {
    //  backbone: 'backbone'
    //},
    //'backbone.validation': {
    //  backbone: 'backbone'
    //},
    'module_interfaces/backbonePrivate': {
      backbone: 'backbone'
    },
    'module_interfaces/d3Private': {
      d3: 'd3'
    },
    'module_interfaces/jqueryPrivate': {
      jquery: 'jquery'
    },
    //marionette: {
    //  backbone: 'backbone'
    //},
    //'module_interfaces/marionettePrivate': {
    //  marionette: 'marionette'
    //},
    'module_interfaces/rickshawPrivate': {
      rickshaw: 'rickshaw'
    },
    //'module_interfaces/showdownPrivate': {
    //  showdown: 'showdown'
    //},
    'underscore.string': {
      underscore: 'underscore'
    },
    'module_interfaces/underscorePrivate': {
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
    //AboutView: 'views/AboutView',
    //HeaderState: 'models/HeaderState',
    backbone: '../bower_components/backbone/backbone',
    //backbonePrivate: './lib/backbonePrivate',
    //'backbone.courier': '../bower_components/backbone.courier/dist/backbone.courier',
    'backbone.DOMStorage': '../bower_components/Backbone.DOMStorage/backbone.domStorage',
    //'backbone.localstorage': '../bower_components/backbone.localstorage/backbone.localStorage',
    //'backbone.forms': '../bower_components/backbone-forms/distribution.amd/backbone-forms',
    //'backbone.validation': '../bower_components/backbone-validation/dist/backbone-validation-amd',
    //behaviors: 'behaviors/index',
    //bootstrap: 'module_interfaces/bootstrap',
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
    //CaptureAppLinks: 'behaviors/CaptureAppLinks',
    //CommentBox: 'react_components/CommentBox',
    //ContentRegion: 'regions/ContentRegion',
    //customParsers: 'mixins/customParsers',
//    customSanitizers: 'mixins/customSanitizers',
//    customValidators: 'mixins/customValidators',
    d3: '../bower_components/d3/d3',
    //d3Private: 'lib/d3Private',
    //DatePickerView: 'views/DatePickerView',
    //DatePickerViewOrig: 'views/DatePickerViewOrig',
    //DummyContentRegion: 'regions/DummyContentRegion',
    //DummyItem1View: 'views/DummyItem1View',
    //DummyLayoutView: 'views/DummyLayoutView',
    //FilterableProductTable: 'react_components/FilterableProductTable',
    //FooterRegion: 'regions/FooterRegion',
    //FooterView: 'views/FooterView',
    //HeaderRegion: 'regions/HeaderRegion',
    //HeaderView: 'views/HeaderView',
    //HelloWorld: 'react_components/HelloWorld',
    //HomeView: 'views/HomeView',
    //InputView: 'views/InputView',
    //InputViewOrig: 'views/InputViewOrig',
    jquery: '../bower_components/jquery/dist/jquery',
//    jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
//    jqueryPrivate: './lib/jqueryPrivate',
//    jsx: '../bower_components/require-jsx/jsx',
//    JSXTransformer: '../bower_components/react/JSXTransformer',
//    marionette: '../bower_components/marionette/lib/backbone.marionette',
    //marionettePrivate: './lib/marionettePrivate',
    //Measurement: 'models/Measurement',
    //Measurements: 'collections/Measurements',
    //MeasurementsData: 'presenters/MeasurementsData',
//    measurementInputView: 'views/measurementInputView',
//    MeasurementEditView: 'views/MeasurementEditView',
    //MeasurementEditViewOrig: 'views/MeasurementEditViewOrig',
    //MeasurementsGraphView: 'views/MeasurementsGraphView',
    //MeasurementShowView: 'views/MeasurementShowView',
    //MeasurementsTableView: 'views/MeasurementsTableView',
    //MeasurementsTableListView: 'views/MeasurementsTableListView',
    moment: '../bower_components/moment/moment',
    //nvd3: '../bower_components/nvd3/nv.d3',
    //Patient: 'models/Patient',
    //PatientView: 'views/PatientView',
    //react: '../bower_components/react/react-with-addons',
    //Region: 'regions/Region',
    rickshaw: '../bower_components/rickshaw/rickshaw',
    //rickshawPrivate: 'lib/rickshawPrivate',
    //showdown: '../bower_components/showdown/src/showdown',
    //showdownPrivate: 'lib/showdownPrivate',
    //SignInView: 'views/SignInView',
    //simpleLineGraph: 'views/simpleLineGraph',
    //sinon: '../bower_components/sinonjs/sinon',
    //TestChildView: 'views/TestChildView',
    //TestRegion: 'regions/TestRegion',
    //TestView: 'views/TestView',
    text: '../bower_components/text/text',
    //TimePickerView: 'views/TimePickerView',
    //Timer: 'react_components/Timer',
    //TimePickerViewOrig: 'views/TimePickerViewOrig',
//    vitalsMeasurement: 'models/vitalsMeasurement',
//    vitalsMeasurements: 'collections/vitalsMeasurements',
//    vitalsMeasurementView: 'views/vitalsMeasurementView',
//    vitalsMeasurementsView: 'views/vitalsMeasurementsView',
//    todoView: 'views/todoView',
//    todosView: 'views/todosView',
    underscore: '../bower_components/underscore/underscore',
    'underscore.string': '../bower_components/underscore.string/lib/underscore.string'
    //underscorePrivate: './lib/underscorePrivate'

  },
  // So all this does is delay the loading of these files until jQuery loads. Meaning the tags shouldn't get appended
  // to head until jQuery is registered. By logging document.head.lastChild in the define function for jqueryPrivate,
  // you can see that that's the case. The lastChild at that point is the Backbone script tag, whereas in the final
  // version of the page, it's the bootstrap scripts.
  shim: {
    'backbone.DOMStorage': { deps: ['underscore', 'backbone'] },
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
    'bootstrap.transition': { deps: ['jquery'] },
    d3: { exports: 'd3' }
    //showdown: {exports: 'Showdown'}
    //,
    //nvd3: {
    //  deps: ['d3'],
    //  exports: 'nv'
    //}
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
