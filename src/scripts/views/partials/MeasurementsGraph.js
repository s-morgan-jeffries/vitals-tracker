var measurementsGraph;
define([
  'underscore',
  'backbone',
  'rickshaw',
  'views/View',
  'templates',
  'appMediator'
], function (_, Backbone, Rickshaw, View, templates, appMediator) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  var graphOptions = {
    renderer: 'lineplot',
    interpolation: 'linear',
    toggle: true,
    highlight: true,
    hover: true,
    //defaultRange: 20,
    rangeSlider: true,
    dataConfig: [
      {
        attr: 'temperature',
        color: 'red',
        key: 'Temp'
      },
      {
        attr: 'pulse',
        color: 'orange',
        key: 'Pulse'
      },
      {
        attr: 'sbp',
        color: 'yellow',
        key: 'SBP'
      },
      {
        attr: 'dbp',
        color: 'green',
        key: 'DBP'
      },
      {
        attr: 'respirations',
        color: 'blue',
        key: 'Resp'
      },
      {
        attr: 'saturation',
        color: 'indigo',
        key: 'O2Sat'
      },
      {
        attr: 'measuredAt',
        isTime: true
      }
    ]
  };

  protoProps.template = templates['partials/measurements-graph'];

  protoProps.initialize = function () {
    //
    this.listenTo(appMediator, 'route:changed window:resize', this._resizeGraph);
    this.listenTo(this, 'parent:rendered', this._resizeGraph);
    measurementsGraph = this;
  };

  protoProps._getGraphSize = function () {

    // d0ne: Fix this. We need to set this thing up with some dimensions going into the render cycle.
    // Very confusing. _createGraph is called by _onRender, so at this point, we should have updated this.$el (using
    // setElement) and replaced the old element in the DOM (using replaceWith). So I don't understand why the parent
    // seems not to exist at this point. Wait, no, I get it now. It's because this is a subview, so it won't become
    // part of the DOM until after it's rendered. So how to give it some dimensions? Hmmm....

    var ASPECT_RATIO = 1.8;

    var graphWidth = this.$el.width(),
      // jshint bitwise: false
      graphHeight = (graphWidth / ASPECT_RATIO) >> 0;
      // jshint bitwise: true

    return {
      width: graphWidth,
      height: graphHeight
    };
  };

  protoProps._resizeGraph = function () {
    var rickshawGraphView = this.subviews && this.subviews.rickshawGraph,
      newSize = this._getGraphSize();
    if (rickshawGraphView) {
      rickshawGraphView.resize(newSize);
    }
  };

  protoProps._createSubviews = function () {
    var RickshawGraphView = Rickshaw.RickshawGraphView;
    var rickshawGraphOpts = _.extend({}, {collection: this.collection}, graphOptions);
    this.subviews = {
      rickshawGraph: new RickshawGraphView(rickshawGraphOpts)
    };
    return this;
  };

  return View.extend(protoProps, staticProps);
});
