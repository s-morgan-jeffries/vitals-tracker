define([
  '../bower_components/backbone/backbone',
  'templates'
], function (Backbone, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.template = templates['pages/author-list'];

  protoProps.initialize = function () {
    this.listenTo(this.collection, 'sync', this.render);
  };

  protoProps.render = function () {
    var presenter = this.collection.toPresenter();
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
