define([
  'backbone',
  'config'
], function (Backbone, config) {
  'use strict';

  var appChannel = Backbone.Wreqr.radio.channel(config.channelName);

  appChannel.vent.on('before:start', function () {
    console.log('this is the app channel before start');
  });

  return Backbone.Wreqr.radio.channel(config.channelName);
});
