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
    this.removeSubviews();
    this.createSubviews();
    return this.renderTemplate(presenter);
  };

  // The default createPresenter is an empty method, so by default there is no presenter.
  protoProps.createPresenter = function () {};

  protoProps.createSubviews = function () {};

  protoProps.addSubviews = function ($el) {
    var subviews = this.subviews;
    // Attach the subviews if they exist.
    if (subviews) {
      _.forEach(subviews, function (subview, subviewName) {
        // Subviews get attached to the DOM wherever there's a DOM element with the correct class (maybe change this to
        // id?). It's basically a dummy element to mark where the subview should go.
        var selector = '#' + _.str.dasherize(subviewName) + '-subview',
          $subEl = $el.find(selector);
        if ($subEl) {
          // If the dummy element exists, we replace it here.
          $subEl.replaceWith(subview.render().el);
        }
      });
    }
  };

  protoProps.renderTemplate = function (presenter) {
    // Create the new element
    var $newEl = Backbone.$(this.template(presenter));
    // Add subviews to $newEl. This should happen here, before it gets attached to the DOM.
    this.addSubviews($newEl);
    if (this.$el[0].tagName === $newEl[0].tagName) {
      // If the tag name of the new element matches that of the current element, replace this.$el's innerHTML with that
      // of the new element. This saves the cost of re-delegating events.
      // EDIT: Instead of using jQuery#html, you have to use jQuery#empty#append. That's because jQuery#html accepts
      // and returns a string, instead of an object. You need to use the object form so you don't lose the behaviors
      // you've set up for your subviews.
      this.$el.empty().append($newEl.children());
    } else {
      // If they don't match, call the setElement method, which will swap out the element and re-delegate events.
      this.setElement($newEl);
    }
    return this;
  };

  protoProps.remove = function () {
    // First, remove the subviews if there are any.
    this.removeSubviews();
    // Now remove the element itself
    Backbone.View.prototype.remove.call(this);
  };

  protoProps.removeSubviews = function () {
    var subviews = this.subviews;
    if (subviews) {
      _.forEach(subviews, function (subview) {
        subview.remove();
      });
    }
    delete this.subviews;
  };

  protoProps.attributesFrom = function ($form) {
    var serializedForm = $form.serializeArray(),
      attr = {},
      i,
      len,
      thisAttr;
    for (i = 0, len = serializedForm.length; i < len; i++) {
      thisAttr = serializedForm[i];
      attr[thisAttr.name] = thisAttr.value;
    }
    return attr;
  };

  return Backbone.View.extend(protoProps, staticProps);
});
