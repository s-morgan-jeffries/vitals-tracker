define([
  'underscore',
  'backbone',
  'appMediator'
], function (_, Backbone, appMediator) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  // Defined routes. Each route should map to a named controller.
  protoProps.routes = {
    'home': 'home',
    'user/:userId': 'userHome',
    'about': 'about',
    'register': 'register',
    'login': 'login',
    'logout': 'logout',
    'patients/:patientId': 'patient',
    'patients': 'patientList',
    '*default': function () {
      appMediator.trigger('router:navigate', 'home', {trigger: true, replace: true});
    }
  };

  protoProps._navigate = function () {
    Backbone.Router.prototype.navigate.apply(this, arguments);
  };

  // Modified version of the navigate method that takes a `force` option. That way, if we navigate to a URL, it will
  // either load it or refresh the page (assuming we were already there).
  protoProps.navigate = function (route, options) {
    options = _.clone(options) || {};
    // If the `force` option is set to true, we want the page to refresh regardless of the current location. To do
    // this, we temporarily redirect to a location that does not exist.
    if (options.force) {
      // jshint bitwise: false
      // If you have a URL like this in your app, you should rethink your app and your career.
      var tempRedirectUrl = 'temp-redirect-' + (Math.random() * 100000 >> 0);
      // jshint bitwise: true
      // We don't want this redirect to trigger, and we don't want it to be entered in the history. We therefore set
      // trigger to false, and we set replace to whatever it was in the options argument.
      var tempRedirectOptions = {
        replace: options.replace,
        trigger: false
      };
      // We then set options.replace to true, so that we replace the temporary location in the history.
      options.replace = true;
      this._navigate(tempRedirectUrl, tempRedirectOptions);
    }
    this._navigate(route, options);
    // Trigger a route:changed event on the appMediator
    //console.log('triggering route:changed event');
    appMediator.trigger('route:changed');
  };

  protoProps.initialize = function () {
    // Add event listeners. Both of these are essentially using a command pattern. The methods become available on the
    // appMediator. In an effort to keep things simple, I'm not adding an interface specifically for commands, but you
    // could.
    // This is basically a pass-through function for using the router's navigate method
    appMediator.registerCommand('navigate', this.navigate, this);
    // This is a slightly higher-level function that assumes you'll want to trigger the routing function.
    appMediator.registerCommand('goTo', function (route) {
      //console.log('goTo:' + route);
      this.navigate(route, {force: true, trigger: true});
    }, this);

    // Add a listener on the appMediator so that it broadcasts `route` events from the router
    appMediator.listenTo(this, 'route', function () {
      var args = [].slice.call(arguments);
      appMediator.trigger.apply(appMediator, ['route'].concat(args));
    });
  };

  return new (Backbone.Router.extend(protoProps, staticProps))();
});
