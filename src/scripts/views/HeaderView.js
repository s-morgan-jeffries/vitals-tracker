define([
  'underscore',
  'backbone',
  'templates',
  'appChannel',
  'HeaderState'
], function (_, Backbone, templates, appChannel, HeaderState) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.tagName = 'div';

  protoProps.initialize = function () {
    // You could have a single AppState object that synchronizes with the back end, and the HeaderState could come from
    // that. Or whatever.
    this.model = new HeaderState({id: 1});
    this.model.fetch();
    this.listenTo(this.model, 'change:signedIn', function () {
      console.log('signedIn change registered');
      this.render();
    });
    Backbone.Courier.add(this);
  };

  protoProps.ui = {
    'signIn': '.sign-in',
    'signOut': '.sign-out'
  };

  protoProps.events = {
    'click @ui.signIn': function () {
      appChannel.vent.trigger('signin');
    },
    'click @ui.signOut': function () {
      appChannel.vent.trigger('signout');
    }
  };

  protoProps.behaviors = {
    CaptureAppLinks: {}
  };

  protoProps.template = function (serializedModel) {
    return templates.Header(serializedModel);
  };

  return Backbone.Marionette.ItemView.extend(protoProps, staticProps);
});
