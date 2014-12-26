define([
  'backbone',
  'templates'
], function (Backbone, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.template = templates['pages/user-home'];

  //t0d0: Fix this so there are default values for user and it re-renders on change
  protoProps.initialize = function () {
    this.listenTo(this.model, 'change', this.render);
  };

  protoProps.render = function () {
    //console.log(this.model.attributes);
    var presenter = this.model.toPresenter();
    //console.log(presenter);
    // Create the new element
    var $newEl = Backbone.$(this.template(presenter));
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

  return Backbone.View.extend(protoProps, staticProps);
});
