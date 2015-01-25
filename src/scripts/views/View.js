define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var protoProps = {},
    staticProps = {};


  // A reference to jQuery for convenience
  staticProps.$ = Backbone.$;

  /////////////////////////////////////////////////////////////////////////
  // These are standard view methods. You shouldn't have to override these.
  /////////////////////////////////////////////////////////////////////////

  // The standard render method
  protoProps.render = function () {
    //this.hasRendered = false;
    this
      // First, remove any old subviews from the rendered view. If we haven't rendered yet, no subviews have been created,
      // so this will just return the view.
      ._removeSubviews()
      // This renders the template using the presenter object.
      ._renderTemplate()
      // Create subviews (this doesn't attach them to the DOM, it just creates them)
      ._createSubviews()
      // Add subviews to the template at the places designated in the template.
      ._addSubviews()
      // Now add plugin behavior. Not sure if this should go here or just be folded into the _onRender method. Or maybe
      // be made into a _beforeRender or _beforeAttachment method. _addPlugins feels too specific.
      ._addPlugins()
      // Attach everthing to the DOM
      ._updateElement()
      // Perform any custom actions
      ._onRender()
    ;
    //this.hasRendered = true;
    return this;
  };

  // Render the template and attach it to the view. This doesn't insert it into the DOM.
  protoProps._renderTemplate = function () {
    // Create the presenter object.
    var presenter = this._createPresenter();
    // Create the new element
    this._$newEl = Backbone.$(this.template(presenter));
    return this;
  };

  // Check for subviews and, if they exist, add them to the rendered template
  protoProps._addSubviews = function () {
    var subviews = this.subviews,
      $newEl = this._$newEl;
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

  // Set the newly rendered element as the element for this view. This may or may not result in the element being
  // attached to the DOM. There are basically two built-in ways for an element to be set on a Backbone View. One is for
  // the element to be set manually. That's what happens when you attach the AppView to the top-level element. The other
  // way, which is the default, is to call Backbone.View#_ensureElement, which will create the element using the
  // tagName, className, id, and attributes properties. If you go with the former, you may be expecting it to be
  // attached to the DOM already. That's important because this method will change the element if its tagName doesn't
  // match that of the newly rendered template. So if, for example, you render the template for the AppView, and its
  // tagName doesn't match that of the element you're attaching it to on the DOM, you'll need to manually handle the
  // insertion of the new element into the DOM, as well as the removal of the old one. Otherwise, you'll never see it.
  protoProps._updateElement = function () {
    var $newEl = this._$newEl;
    // This only checks to see if the tags match, but you really also need to get the attributes to line up.
    // dr0pped: Update this so attributes get copied into the root element.
    // dr0pped: Consider what happens if your top-level element changes depending on branching in your template (e.g. div v section).
    //    - Also, what happens if certain attributes are set depending on values in the presenter? In that case, you'd
    //      need to copy the attributes over again.
    //    - You've sort of been assuming the top-level element will be set once and that's it. But that isn't
    //      necessarily true.
    //    - You need to figure out how this affects the way that you're attaching plugins. Right now, you're assuming
    //      that once this has rendered once, it's okay to attach things (like trackFocus). That isn't necessarily a
    //      safe assumption.
    // d0ne: Figure out if you could replace all this branching logic with something simpler:
    var $oldEl = this.$el;
    this.setElement($newEl);
    $oldEl.replaceWith($newEl);
    //  - It really seems like this would solve most of the issues you've outlined here. You could always assume that
    //    $newEl was going to be the view's element. No more checking to see if the view has rendered.
    // backburner: Look up the internals of jQuery#remove and jQuery#data to make sure you've got a handle on them.
    //if (this.$el[0].tagName === $newEl[0].tagName) {
    //  // If the tag name of the new element matches that of the current element, replace this.$el's innerHTML with that
    //  // of the new element. This saves the cost of re-delegating events.
    //  // EDIT: Instead of using jQuery#html, you have to use jQuery#empty#append. That's because jQuery#html accepts
    //  // and returns a string, instead of an object. You need to use the object form so you don't lose the behaviors
    //  // you've set up for your subviews.
    //  this.$el.empty().append($newEl.children());
    //  // By this point, $newEl has no children and won't be used for anything. Now we can clean up. This should really
    //  // only be an issue if there's some data associated with $newEl (e.g. if we add a plugin), which shouldn't be the
    //  // case right now. On the other hand, there's really no downside to this. If it causes a problem, it means I
    //  // didn't understand how this worked before.
    //  // EDIT: This is bothering me. It really shouldn't be necessary, so I'm taking it out.
    //  //$newEl.remove();
    //} else {
    //  // If they don't match, call the setElement method, which will swap out the element and re-delegate events.
    //  var $oldEl = this.$el;
    //  // Setting the element on the view.
    //  this.setElement($newEl);
    //  // Importantly, setElement doesn't call jQuery#remove, so if you have plugins associated with this.$el, you could
    //  // get a memory leak here. This should take care of that.
    //  $oldEl.remove();
    //}
    delete this._$newEl;
    return this;
  };

  // Override the built-in Backbone.View#remove method so that we can remove any subviews before removing this view.
  protoProps.remove = function () {
    this
      // First, remove the subviews if there are any.
      ._removeSubviews()
      // Perform any cleanup
      ._onRemove();
    // Now remove the element itself
    Backbone.View.prototype.remove.call(this);
    return this;
  };

  // Method for removing subviews from the view
  protoProps._removeSubviews = function () {
    var subviews = this.subviews;
    if (subviews) {
      _.forEach(subviews, function (subview) {
        subview.remove();
      });
    }
    delete this.subviews;
    return this;
  };

  // Method for serializing forms. I'm barely using this.
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

  ///////////////////////////////////////////////
  // These view methods may need to be overridden
  ///////////////////////////////////////////////

  // The default _createPresenter is an empty method, so by default there is no presenter.
  protoProps._createPresenter = function () {};

  // Default _createSubviews method. It just returns the view.
  protoProps._createSubviews = function () {
    return this;
  };

  // Default _addPlugins method. It just returns the view.
  protoProps._addPlugins = function () {
    return this;
  };

  // Default _onRender method. It just returns the view.
  protoProps._onRender = function () {
    return this;
  };

  // Default _onRemove method. It just returns the view.
  protoProps._onRemove = function () {
    return this;
  };

  return Backbone.View.extend(protoProps, staticProps);
});
