define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var noop = function () {};

  var setAuthHeader = function (accessToken, options) {
    // If the beforeSend option is explicitly set to false, that will cancel the request. It's probably been set that
    // way for a reason, so we don't want to change it.
    if (options.beforeSend !== false) {
      // Capture the original beforeSend function if it exists.
      var beforeSend = options.beforeSend || noop;
      // Wrap the original beforeSend function in a new function that sets the Authorization request header.
      options.beforeSend = function (xhr, settings) {
        xhr.setRequestHeader('Authorization', accessToken);
        beforeSend(xhr, settings);
      };
    }
  };

  var LoopBackConnection = function (options) {

    // Just for practice, this is a mechanism for ensuring the right value is returned, even if the new keyword is
    // omitted.
    if (!(this instanceof LoopBackConnection)) {
      return new LoopBackConnection(options);
    }

    // Set options
    options = options || {};
    //this.loginUrl = options.loginUrl || options.host + this._loginUrl;
    //this.logoutUrl = options.logoutUrl || options.host + this._logoutUrl;

    // Declare token in closure
    var token;

    // Only methods that need access to the closure have to be defined here.
    // Method for setting the value of the token
    this.setToken = function (tokenObj) {
      var createdAt, ttl;

      // Make an object so we don't throw an error
      tokenObj = tokenObj || {};

      // 1) Set the accessToken for this module so that subsequent requests are properly authenticated. If no arguments
      // were passed in, this will just set the token to undefined.
      token = tokenObj.id;

      // 2) Figure out when the token will become invalid
      createdAt = tokenObj.created;
      ttl = tokenObj.ttl;
      // In this case, we need to check whether the properties exist; otherwise, we'll get an error below.
      if (createdAt && ttl) {
        this._destroyAt = new Date(createdAt.valueOf() + (ttl * 1000));
      } else {
        this._destroyAt = void 0;
      }
    };

    // We need this for the logout function.
    this.getToken = function () {
      return token;
    };

    // Replacement sync function for models and collections. Sets the Authorization header, then proxies Backbone.sync.
    // This will be attached directly to other objects and will be called with their context, so it can't rely on
    // context for getting the value of the token (this.getToken won't work because 'this' refers to a Model or
    // Collection).
    this.sync = function (method, model, opts) {
      opts = opts || {};
      if (token) {
        setAuthHeader(token, opts);
      }
      Backbone.sync.call(this, method, model, opts);
    };

    this.initialize(options);
  };

  _.extend(LoopBackConnection.prototype, Backbone.Events, {

    initialize: function () {},

    // Delegate to the setToken method, but call it with no argument
    unsetToken: function () {
      this.setToken();
    }

  });

  LoopBackConnection.extend = Backbone.Model.extend;

  return LoopBackConnection;
});
