var app;
define([
  'backbone',
  'views/View',
  'appMediator',
  'appState',
  'appRouter',
  'views/Header',
  'views/Content',
  'views/Footer',
  'templates'
], function (Backbone, View, appMediator, appState, appRouter, SiteHeaderView, ContentView, SiteFooterView, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {},
    AppView;

  // The app will run in the document body
  protoProps.el = Backbone.$('#vitals-tracker-app')[0];

  protoProps.template = templates.app;

  // Initialization
  protoProps.initialize = function () {
    appMediator.trigger('app:start');
    // Render the view
    this.render();
    // Start the history
    Backbone.history.start();
    var currentLocation = Backbone.history.getFragment();
    if (currentLocation === '') {
      appMediator.execute('goTo', 'home');
    }
  };

  protoProps.createSubviews = function () {
    this.subviews = {
      header: new SiteHeaderView({model: appState}),
      content: new ContentView(),
      footer: new SiteFooterView()
    };
  };

  // Events
  // This is the most compelling reason for organizing the app with a view. It makes it easy to attach events to it.
  protoProps.events = {
    // This is for capturing clicks on application links
    'click a[href^="/"]': function (event) {
      var href = Backbone.$(event.target).attr('href');
      //var passThrough = href.indexOf('sign_out') >= 0;
      var passThrough = false;

      if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        event.preventDefault();
      }

      // Remove leading slashes and hash bangs (backward compatablility)
      var url = href.replace(/^\//,'').replace('#!\/','');

      // Instruct Backbone to trigger routing events
      appMediator.execute('goTo', url);

      return false;
    }
  };

  AppView = View.extend(protoProps, staticProps);

  return {
    start: function () {
      app = new AppView();
    }
  };
});
