define([
  'underscore',
  'backbone',
  'appMediator'
], function (_, Backbone, appMediator) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.show = function (view) {
    // Clear out the old view if it exists
    this.empty();
    // Set the _currentView property to reference this view
    this._currentView = view;
    // Render the view and set the
    this.$el.html(view.render().el);
  };

  protoProps.empty = function () {
    if (this._currentView) {
      // Calling remove on the view:
      // 1) removes the element from the DOM (by calling jQuery#remove), and
      // 2) stops it from listening to events
      this._currentView.remove();
      // Delete the reference to the view
      delete this._currentView;
    }
  };

  protoProps.addControllers = function (controllers) {
    this.controllers = _.extend({}, (this.controllers || {}), controllers);
    if (!this._hasRouteListener) {
      // Listen for `route` events and call the appropriate controller.
      this.listenTo(appMediator, 'route', this.callController);
      this._hasRouteListener = true;
    }
  };

  // Method for delegating to controller methods
  protoProps.callController = function (controllerName, params) {
    // First, check to make sure the named controller exists.
    if (controllerName in this.controllers) {
      // The controller name is the first argument. If the controller were a function on the router itself, it would
      // only receive the arguments after that. We're trying to use the same calling convention here, so we'll use slice
      // to get all the arguments after the first.
      //var args = [].slice.call(arguments, 1);
      // Now call the named controller with the context set to this view.
      this.controllers[controllerName].apply(this, params);
    }
  };

  protoProps.render = function () {
    // Create the new element
    var $newEl = Backbone.$(this.template());
    if (this.$el[0].tagName === $newEl[0].tagName) {
      // If the tag name of the new element matches that of the current element, replace this.$el's innerHTML with that
      // of the new element. This saves the cost of re-delegating events.
      // EDIT: This only works because for a RegionView, there is no innerHtml to start with. The methods operate on
      // the view's el. There's no nested elements with any special behaviors, so you don't lose anything by converting
      // to a string.
      this.$el.html($newEl.html());
    } else {
      // If they don't match, call the setElement method, which will swap out the element and re-delegate events.
      this.setElement($newEl);
    }
    return this;
  };

  // Overloaded remove method. It empties out the region (which removes the _currentView) before calling remove on the
  // region itself.
  protoProps.remove = function () {
    this.empty();
    Backbone.View.prototype.remove.call(this);
  };

  return Backbone.View.extend(protoProps, staticProps);
});
