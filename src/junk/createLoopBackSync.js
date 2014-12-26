define([
  '../bower_components/underscore/underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var noop = function () {};

  return function createLoopBackSync () {
    var accessToken,
      useHeader = true;

    var setAuthHeader = function (options) {
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

    var setRequestData = function (method, model, options) {
      //// Ensure that we have the appropriate request data.
      //if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      //  params.contentType = 'application/json';
      //  params.data = JSON.stringify(options.attrs || model.toJSON(options));
      //}
      options.data = _.extend({}, options.data, {
        // jshint camelcase: false
        access_token: accessToken
        // jshint camelcase: true
      });
    };

    var sync = function (method, model, options) {
      options = options || {};
      if (accessToken) {
        if (useHeader) {
          setAuthHeader(options);
        } else {
          setRequestData(method, model, options);
        }
      }
      Backbone.sync.call(this, method, model, options);
    };

    sync.setToken = function (token) {
      accessToken = token;
    };

    sync.unsetToken = function () {
      accessToken = void 0;
    };

    //sync.useHeader = function () {
    //  useHeader = true;
    //};
    //
    //sync.useRequestData = function () {
    //  useHeader = false;
    //};

    return sync;
  };
});
