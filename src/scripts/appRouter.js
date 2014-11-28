define([
  'backbone',
  'appChannel'
], function (Backbone, appChannel) {
  'use strict';

  var config = {},
    AppRouter,
    appRouter;

  // Going with SRP, all the appRouter does is match url patterns and trigger events. There are no methods on the router
  // because I don't want it to do anything with the patterns. I just want it to match them and trigger an event.
  // The current pattern I'm using is to have regions subscribe to those events and update their content.
  config.routes = {
    'home': 'home',
    'about': 'about',
    'sign-in': 'sign-in',
    'sign-out': 'sign-out',
    '*default': 'home'
  };

  AppRouter = Backbone.Router.extend(config);
  appRouter = new AppRouter();

  // Not sure I'm crazy about this. Probably should minimize dependence on Marionette. If you want things to be
  // decoupled like this, you could use a trigger event on the Backbone object.
  // However, in general, this pattern makes sense.
  appChannel.commands.setHandler('navigate', function () {
    appRouter.navigate.apply(appRouter, arguments);
  });

  // Instead of listening to the router itself, you can listen to the appChannel. This is a little more decoupled.
  appChannel.vent.listenTo(appRouter, 'all', function () {
    this.trigger.apply(this, arguments);
  });

  return appRouter;
});
