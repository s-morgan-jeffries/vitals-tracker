define([
  'underscore',
  'backbone',
  'templates',
  'auth'
], function (_, Backbone, templates, auth) {
  'use strict';

  var protoProps = {},
    staticProps = {},
    $ = Backbone.$;

  protoProps.template = templates['pages/login'];

  protoProps.render = function () {
    var presenter = this.model.toPresenter();
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

  protoProps.events = {
    'submit #loginform': 'submitLogin'
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

  protoProps.submitLogin = function (event) {
    event.preventDefault();
    var attr = this.attributesFrom($(event.target));
    attr = _.pick(attr, 'email', 'password');
    //console.log(attr);
    auth.login(attr);
  };

  return Backbone.View.extend(protoProps, staticProps);
});
