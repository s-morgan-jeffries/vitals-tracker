define([
  'backbone',
  'templates',
  'appMediator'
], function (Backbone, templates, appMediator) {
  'use strict';

  var protoProps = {},
    staticProps = {};


  var DELAY = 10000;

  var redirectToHome = function () {
    appMediator.execute('goTo', 'home');
  };

  protoProps.template = templates['pages/logout'];

  protoProps.initialize = function () {
    // This sets a timeout on the redirectToHome function and saves the handle...
    this._redirectHandle = setTimeout(redirectToHome, DELAY);
    // ... so that this can clear the timeout if we navigate away from this page.
    this.listenTo(appMediator, 'route', this.cancelRedirect);
  };

  protoProps.render = function () {
    // Create the new element
    var $newEl = Backbone.$(this.template());
    if (this.$el[0].tagName === $newEl[0].tagName) {
      // If the tag name of the new element matches that of the current element, replace this.$el's innerHTML with that
      // of the new element. This saves the cost of re-delegating events.
      this.$el.html($newEl.html());
    } else {
      // If they don't match, call the setElement method, which will swap out the element and re-delegate events.
      this.setElement($newEl);
    }
    return this;
  };

  protoProps.cancelRedirect = function () {
    clearTimeout(this._redirectHandle);
    delete this._redirectHandle;
  };

  return Backbone.View.extend(protoProps, staticProps);
});
