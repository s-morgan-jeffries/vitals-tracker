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
      rickshaw: 'module_interfaces/rickshawPrivate',
      underscore: 'module_interfaces/underscorePrivate'
    },
    // 'jquery-private' wants the real jQuery module
    // though. If this line was not here, there would
    // be an unresolvable cyclic dependency.
    'backbone.DOMStorage': {
      backbone: 'backbone'
    },
    'bootstrap-datetimepicker': {
      jquery: 'jquery'
    },
    'jquery-ui': {
      jquery: 'jquery'
    },
    'module_interfaces/jqueryCore': {
      jquery: 'jquery'
    },
    'module_interfaces/backbonePrivate': {
      backbone: 'backbone'
    },
    'module_interfaces/d3Private': {
      d3: 'd3'
    },
    'module_interfaces/rickshawPrivate': {
      rickshaw: 'rickshaw'
    },
    'underscore.string': {
      underscore: 'underscore'
    },
    'module_interfaces/underscorePrivate': {
      underscore: 'underscore'
    }
  },
  paths: {
    backbone: '../bower_components/backbone/backbone',
    'backbone.DOMStorage': '../bower_components/Backbone.DOMStorage/backbone.domStorage',
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
    appConfig: 'devConfig',
    d3: '../bower_components/d3/d3',
    jquery: '../bower_components/jquery/dist/jquery',
    'jquery-ui': '../bower_components/jquery-ui/jquery-ui',
    moment: '../bower_components/moment/moment',
    rickshaw: '../bower_components/rickshaw/rickshaw',
    text: '../bower_components/text/text',
    underscore: '../bower_components/underscore/underscore',
    'underscore.string': '../bower_components/underscore.string/lib/underscore.string'

  },
  // So all this does is delay the loading of these files until jQuery loads. Meaning the tags shouldn't get appended
  // to head until jQuery is registered. By logging document.head.lastChild in the define function for jqueryPrivate,
  // you can see that that's the case. The lastChild at that point is the Backbone script tag, whereas in the final
  // version of the page, it's the bootstrap scripts.
  shim: {
    'backbone.DOMStorage': { deps: ['underscore', 'backbone'] },
    'bootstrap.affix': { deps: ['module_interfaces/jqueryCore'] },
    'bootstrap.alert': { deps: ['module_interfaces/jqueryCore'] },
    'bootstrap.button': { deps: ['module_interfaces/jqueryCore'] },
    'bootstrap.carousel': { deps: ['module_interfaces/jqueryCore'] },
    'bootstrap.collapse': { deps: ['module_interfaces/jqueryCore'] },
    'bootstrap.dropdown': { deps: ['module_interfaces/jqueryCore'] },
    'bootstrap.modal': { deps: ['module_interfaces/jqueryCore'] },
    'bootstrap.popover': { deps: ['module_interfaces/jqueryCore', 'bootstrap.tooltip'] },
    'bootstrap.scrollspy': { deps: ['module_interfaces/jqueryCore'] },
    'bootstrap.tab': { deps: ['module_interfaces/jqueryCore'] },
    'bootstrap.tooltip': { deps: ['module_interfaces/jqueryCore'] },
    'bootstrap.transition': { deps: ['module_interfaces/jqueryCore'] },
    d3: { exports: 'd3' }
  }
});

require(['app'], function (app) {
  'use strict';

  app.start();
});
