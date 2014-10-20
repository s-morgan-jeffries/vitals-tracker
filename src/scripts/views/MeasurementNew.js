define([
  'underscore',
  'backbone',
  'moment',
  'templates',
  'Measurement',
  'InputView'
], function (_, Backbone, moment, templates, Measurement, InputView) {
  'use strict';

  var viewProps = {},
    inputEvents = {};
  inputEvents.blur = 'update';

  viewProps.tagName = 'tr';

  viewProps.template = function (serializedModel) {
    return templates.MeasurementNew(serializedModel);
  };

  viewProps.initialize = function () {
    // Make the model
    var model = this.model = new Measurement();
    this.childViews = [];
    this.render();

    var self = this;
    this.$('input[type=number]').each(function () {
      var inputView = new InputView({el: this, model: model, events: inputEvents});
      self['$' + inputView.name] = inputView;
      self.childViews.push(inputView);
    });
  };

//  console.log('UPDATE THIS VIEW SO IT CLOSES ITS COMPONENT VIEWS ON CLOSE');
  viewProps.close = function () {
    this.off();
    this.stopListening();
    while (this.childViews.length) {
      this.childViews.pop().close();
    }
    this.remove();
  };

  return Backbone.Marionette.ItemView.extend(viewProps);
});