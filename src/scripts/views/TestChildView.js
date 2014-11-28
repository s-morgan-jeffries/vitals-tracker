define([
  'underscore',
  'backbone',
  'TestView',
  'text!../templates/test-child.html'
], function (_, Backbone, TestView, template) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  var ViewState = Backbone.Model.extend({
    data: function () {
      return this.toJSON();
    }
  });

  var TestViewState = ViewState.extend({
    defaults: function () {
      return {
        renderCount: 0,
        clickCount: 0,
        itemList: ['item 1', 'item 2', 'item 3']
      };
    },
    incrementRenderCount: function () {
      // Technically, you shouldn't do this, but this is way less verbose than the alternatives.
      this.attributes.renderCount++;
    },
    incrementClickCount: function () {
      //var clickCount = this.get('clickCount');
      this.set('clickCount', this.get('clickCount') + 1);
    }
  });


  // This should probably not change across views
  protoProps.template = _.template(template);

  // This should probably not change across views
  protoProps.initialize = function () {
    this.viewState = new TestViewState();
    this.listenTo(this.viewState, 'change', this.render);
  };

  // This is the biggest thing that will change from view to view. There will be certain constants, though.
  protoProps.render = function () {
    this.viewState.incrementRenderCount();

    // Every render method will build an innerHtml object. This is the simplest way to do that, but in some cases, it
    // will be more complicated. For example, if you want to render subviews, that will (probably) have to be done
    // manually in this function.
    var innerHtml = this.template(this.viewState.data());

    //
    this.$el.html(innerHtml);
    return this;
  };

  // These are the interactions supported by the view
  protoProps.events = {
    'click .update-view-click-count': 'incrementClickCount'
  };

  protoProps.incrementClickCount = function () {
    console.log('incrementing the click count');
    this.viewState.incrementClickCount();
  };

  return TestView.extend(protoProps, staticProps);
});
