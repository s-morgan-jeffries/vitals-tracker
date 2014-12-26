define([
  '../../bower_components/underscore/underscore',
  'backbone',
  'appChannel'
], function (_, Backbone, appChannel) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.localStorage = new Backbone.LocalStorage('HeaderState');

  protoProps.initialize = function () {
    this.listenTo(appChannel.vent, 'signin', function () {
      this.save({signedIn: true});
      console.log('signing in');
    });
    this.listenTo(appChannel.vent, 'signout', function () {
      this.save({signedIn: false});
      console.log('signing out');
    });
  };

  protoProps.defaults = function () {
    return {
      signedIn: false
    };
  };

  return Backbone.Model.extend(protoProps, staticProps);
});
