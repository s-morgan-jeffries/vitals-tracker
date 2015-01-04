define([
  'underscore',
  'views/View',
  'views/partials/Measurement',
  'templates'
], function (_, View, MeasurementView, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.template = templates['partials/measurements-table'];

  protoProps.initialize = function () {
    this.listenTo(this.collection, 'sync remove sort', this.render);
  };

  protoProps.createPresenter = function () {
    return this.collection.toPresenter();
  };

  protoProps.createSubviews = function () {
    var subviews = this.subviews = [];
    this.collection.forEach(function (model) {
      subviews.push(new MeasurementView({model: model}));
    });
    return this;
  };

  protoProps.addSubviews = function () {
    var subviews = this.subviews,
      $newEl = this.$newEl,
      selector = 'tbody',
      $subEl;
    // Attach the subviews if they exist.
    if (subviews) {
      $subEl = $newEl.find(selector);
      _.forEach(subviews, function (subview) {
        // Subviews get attached to the DOM wherever there's a DOM element with the correct class (maybe change this to
        // id?). It's basically a dummy element to mark where the subview should go.
        if ($subEl) {
          // If the dummy element exists, we replace it here.
          $subEl.append(subview.render().el);
        }
      });
    }
    return this;
  };

  //protoProps.removeSubviews = function () {};

  return View.extend(protoProps, staticProps);
});
