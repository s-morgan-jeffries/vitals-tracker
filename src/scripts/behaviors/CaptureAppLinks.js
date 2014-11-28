define([
  'backbone',
  'config',
  'appChannel'
], function (Backbone, config, appChannel) {
  'use strict';

  var protoProps = {},
    appLinkSelector = 'a[href^="' + config.appRoot + '"]';

  protoProps.events = {};


  protoProps.events['click ' + appLinkSelector] = function (event) {
    var href = Backbone.$(event.target).attr('href');
    var passThrough = href.indexOf('sign_out') >= 0;

    if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      event.preventDefault();
    }

    // Remove leading slashes and hash bangs (backward compatablility)
    var url = href.replace(/^\//,'').replace('#!\/','');

    // Instruct Backbone to trigger routing events
    appChannel.commands.execute('navigate', url, {trigger: true});

    return false;
  };

  return Backbone.Marionette.Behavior.extend(protoProps);
});
