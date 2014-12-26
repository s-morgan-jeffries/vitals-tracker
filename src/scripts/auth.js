define([
  'underscore',
  'backbone',
  'appMediator',
  'apiUrl',
  'plugins/loopBackConnection'
], function (_, Backbone, appMediator, apiUrl, loopBackConnection) {
  'use strict';

  var Auth = function () {
    appMediator.registerCommand('isAuthenticated', this.isAuthenticated, this);
    this.listenToOnce(appMediator, 'app:start', this.onAppStart);
  };

  _.extend(Auth.prototype, Backbone.Events, {
    // t0d0: Add redirect for login (should go back to prior route, if it exists)
    login: function (credentials) {
      var requestSettings = {
        url: apiUrl('login'),
        type: 'POST',
        data: credentials,
        success: function (token) {
          // Set the token on loopBackConnection
          loopBackConnection.setToken(token);
          // Notify other modules via an event that we've logged in, and pass the token to the event.
          appMediator.trigger('login', token);
          // Go to the home page
          appMediator.execute('goTo', 'home');
        },
        error: function () {
          // If there's an error, just trigger an event on this object, and pass it the same arguments as the error
          // callback received.
          appMediator.trigger.apply(appMediator, ['login:error'].concat([].slice.apply(arguments)));
        }
      };
      Backbone.ajax(requestSettings);
    },

    register: function (userProps) {
      var requestSettings = {
        url: apiUrl('register'),
        type: 'POST',
        data: userProps,
        success: function (data) {
          var token = data.accessToken;
          // Notify other modules via an event that we've registered, and pass the data to the event.
          appMediator.trigger('registration', data);
          // Set the token on loopBackConnection
          loopBackConnection.setToken(token);
          // Notify other modules via an event that we've logged in, and pass the token to the event.
          appMediator.trigger('login', token);
          // Go to the home page
          appMediator.execute('goTo', 'home');
        },
        error: function () {
          // If there's an error, just trigger an event on the appMediator, and pass it the same arguments as the error
          // callback received.
          appMediator.trigger.apply(appMediator, ['registration:error'].concat([].slice.apply(arguments)));
        }
      };
      Backbone.ajax(requestSettings);
    },

    logout: function () {
      //var token = appMediator.execute('getToken');
      var token = loopBackConnection.getToken();
      //this.listenToOnce(appMediator, 'token:broadcast', function (token) {
      var requestSettings = {
        url: apiUrl('logout'),
        type: 'POST',
        // Since the logout method doesn't use the module's sync method, we have to manually set the Authorization
        // header.
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', token);
        },
        success: function () {},
        error: function () {
          // If there's an error, just trigger an event on this object, and pass it the same arguments as the error
          // callback received.
          appMediator.trigger.apply(appMediator, ['logout:error'].concat([].slice.apply(arguments)));
        }
      };
      Backbone.ajax(requestSettings);
      // Unset the token on loopBackConnection
      loopBackConnection.unsetToken(token);
      appMediator.trigger('logout');
      appMediator.execute('goTo', 'logout');
    },

    isAuthenticated: function () {
      return !!loopBackConnection.getToken();
    },

    onAppStart: function () {
      var token = appMediator.execute('getSavedToken');
      loopBackConnection.setToken(token);
    }
  });

  return new Auth();
});
