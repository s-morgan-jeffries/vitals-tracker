define([
  'backbone'
], function (Backbone) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.show = function (view) {
    // Clear out the old view if it exists
    this.empty();
    // Set the _currentView property to reference this view
    this._currentView = view;
    // Start listening for the current view's render event
    //this.listenTo(view, 'render', this.render);
    // Call the view's render method (which will automatically trigger the region's render method)
    view.render();
    this.$el.html(view.el);
  };

  //// Rendering just means setting the element's inner HTML to that of the current view
  //protoProps.render = function () {
  //  var currentView = this._currentView;
  //  if (currentView) {
  //    // Append the view element's innter HTML to the region. Notably, using this pattern, the tagName property of the
  //    // view doesn't matter, since it doesn't become part of the DOM.
  //    this.$el.html(currentView.el);
  //  }
  //};

  protoProps.empty = function () {
    if (this._currentView) {
      // Stop listening to the current view
      //this.stopListening(this._currentView);
      // Calling remove on the view:
      // 1) removes the element from the DOM (by calling jQuery#remove), and
      // 2) stops it from listening to events
      this._currentView.remove();
      // Delete the reference to the view
      delete this._currentView;
    }
  };

  return Backbone.View.extend(protoProps, staticProps);
});
