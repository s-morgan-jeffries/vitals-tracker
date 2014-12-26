define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  // The standard render method
  protoProps.render = function () {
    // Create the presenter object. This is the part that tends to change from view to to view, so it's abstracted out
    // into its own method.
    var presenter = this.createPresenter();
    return this.renderTemplate(presenter);
  };

  // The default createPresenter is an empty method, so by default there is no presenter.
  protoProps.createPresenter = function () {};

  protoProps.renderTemplate = function (presenter) {
    // Create the new element
    var $newEl = Backbone.$(this.template(presenter)),
      subviews = this.subviews;
    // Attach the subviews if they exist.
    if (subviews) {
      _.forEach(subviews, function (subview, subviewName) {
        // Subviews get attached to the DOM wherever there's a DOM element with the correct class (maybe change this to
        // id?). It's basically a dummy element to mark where the subview should go.
        var selector = '.' + subviewName + '-subview',
          $el = $newEl.find(selector);
        if ($el) {
          // If the dummy element exists, we replace it here.
          $el.replaceWith(subview.render().el);
        }
      });
    }
    if (this.$el[0].tagName === $newEl[0].tagName) {
      // If the tag name of the new element matches that of the current element, replace this.$el's innerHTML with that
      // of the new element. This saves the cost of re-delegating events.
      // EDIT: Instead of using the jQuery#html, you have to use jQuery#empty#append. That's because jQuery#html accepts
      // and returns a string, instead of an object. You need to use the object form so you don't lose the behaviors
      // you've set up for your subviews.
      this.$el.empty().append($newEl);
    } else {
      // If they don't match, call the setElement method, which will swap out the element and re-delegate events.
      this.setElement($newEl);
    }
    return this;
  };

  protoProps.remove = function () {
    // First, remove the subviews if there are any.
    var subviews = this.subviews;
    if (subviews) {
      _.forEach(subviews, function (subview) {
        subview.remove();
      });
    }
    // Now remove the element itself
    Backbone.View.prototype.remove.call(this);
  };

  return Backbone.View.extend(protoProps, staticProps);
});
