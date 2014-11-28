var app;

define([
  'underscore',
  'backbone',
  'config',
  'appRouter',
  'behaviors/index',
  'HeaderRegion',
  'ContentRegion',
  'FooterRegion',
  'TestRegion',
  'TestChildView'
], function (_, Backbone, globalConfig, appRouter, behaviors, HeaderRegion, ContentRegion, FooterRegion, TestRegion, TestChildView) {
  'use strict';

  var App,
    appConfig = {};

  appConfig.regions = {
    headerRegion: {
      el: '#vitals-app-header',
      regionClass: HeaderRegion
    },
    contentRegion: {
      el: 'main',
      regionClass: ContentRegion
    },
    footerRegion: {
      el: '#vitals-app-footer',
      regionClass: FooterRegion
    }
  };

  appConfig.initialize = function () {
    this.router = appRouter;
    Backbone.history.start();
    this.history = Backbone.history;
    this.headerRegion.trigger('show:header');
    this.footerRegion.trigger('show:footer');
    this.channel.commands.execute('home', {trigger: true});
    //this.router.navigate('home', {trigger: true});
    //this.router.navigate('home');
    this.TestChildView = TestChildView;
    this.testRegion = new TestRegion({el: Backbone.$('#test-div')[0]});
    this.testRegion.show(new TestChildView());
  };

  appConfig = _.extend({}, globalConfig, appConfig);

  App = Backbone.Marionette.Application.extend(appConfig);

  app = new App();

  return app;
});
