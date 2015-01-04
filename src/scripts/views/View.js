define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  // The standard render method
  protoProps.render = function () {
    this.pluginsAdded = false;
    this
      // First, remove any old subviews from the rendered view. If we haven't rendered yet, no subviews have been created,
      // so this will just return the view.
      .removeSubviews()
      // Create subviews (this doesn't attach them to the DOM, it just creates them)
      .createSubviews()
      // This renders the template using the presenter object.
      .renderTemplate()
      // Add subviews to the template at the places designated in the template.
      .addSubviews()
      // Attach everthing to the DOM
      .attachToDOM()
      // Now add plugin behavior. Can't decide if I like this approach. It feels like DOM attachment should be the last
      // step, but right now, there's behavior that I'm attaching to a top-level element, and we don't figure out what
      // that is until the DOM attachment takes place.
      .addPlugins()
    ;
    this.pluginsAdded = true;
    this.hasRendered = true;
    return this;
  };

  protoProps.createSubviews = function () {
    return this;
  };

  // The default createPresenter is an empty method, so by default there is no presenter.
  protoProps.createPresenter = function () {
    // By default, this should return undefined.
  };

  protoProps.renderTemplate = function () {
    // Create the presenter object.
    var presenter = this.createPresenter();
    // Create the new element
    this.$newEl = Backbone.$(this.template(presenter));
    return this;
  };

  protoProps.addSubviews = function () {
    var subviews = this.subviews,
      $newEl = this.$newEl;
    // Attach the subviews if they exist.
    if (subviews) {
      _.forEach(subviews, function (subview, subviewName) {
        // Subviews get attached to the DOM wherever there's a DOM element with the correct id. It's basically a dummy
        // element to mark where the subview should go.
        var selector = '#' + _.str.dasherize(subviewName) + '-subview',
          $subEl = $newEl.find(selector);
        if ($subEl) {
          // If the dummy element exists, we replace it here.
          $subEl.replaceWith(subview.render().el);
        }
      });
    }
    return this;
  };

  protoProps.attachToDOM = function () {
    var $newEl = this.$newEl;
    if (this.$el[0].tagName === $newEl[0].tagName) {
      // If the tag name of the new element matches that of the current element, replace this.$el's innerHTML with that
      // of the new element. This saves the cost of re-delegating events.
      // EDIT: Instead of using jQuery#html, you have to use jQuery#empty#append. That's because jQuery#html accepts
      // and returns a string, instead of an object. You need to use the object form so you don't lose the behaviors
      // you've set up for your subviews.
      this.$el.empty().append($newEl.children());
      // By this point, $newEl has no children and won't be used for anything. Now we can clean up. This should really
      // only be an issue if there's some data associated with $newEl (e.g. if we add a plugin), which shouldn't be the
      // case right now. On the other hand, there's really no downside to this. If it causes a problem, it means I
      // didn't understand how this worked before.
      $newEl.remove();
    } else {
      // If they don't match, call the setElement method, which will swap out the element and re-delegate events.
      var $oldEl = this.$el;
      this.setElement($newEl);
      // Importantly, setElement doesn't call jQuery#remove, so if you have plugins associated with this.$el, you could
      // get a memory leak here. This should take care of that.
      $oldEl.remove();
    }
    delete this.$newEl;
    return this;
  };

  protoProps.addPlugins = function () {
    return this;
  };

  protoProps.remove = function () {
    // First, remove the subviews if there are any.
    this.removeSubviews();
    // Now remove the element itself
    Backbone.View.prototype.remove.call(this);
    return this;
  };

  protoProps.removeSubviews = function () {
    var subviews = this.subviews;
    if (subviews) {
      _.forEach(subviews, function (subview) {
        subview.remove();
      });
    }
    delete this.subviews;
    return this;
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

  staticProps.$ = Backbone.$;

  return Backbone.View.extend(protoProps, staticProps);
});
