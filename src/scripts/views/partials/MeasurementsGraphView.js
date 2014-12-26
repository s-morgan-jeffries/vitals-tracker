define([
  'jquery',
  'underscore',
  'backbone',
  'd3',
  'rickshaw',
  'MeasurementsData'
], function ($, _, Backbone, d3, Rickshaw, MeasurementsData) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.rickshawPlot = function () {
    var graphConfig = {},
      graph;

    graphConfig.renderer = 'lineplot';

    graphConfig.element = this.el;

    graphConfig.series = this.measurementsData.rickshawData;
    graphConfig.interpolation = 'linear';
    //console.log(this.data);

    // Create basic graph
    graph = this.graph = new Rickshaw.Graph(graphConfig);

    // Add hover detail
    new Rickshaw.Graph.HoverDetail({
      graph: graph
      //,
      //xFormatter: function(x) { return x + "seconds" },
      //yFormatter: function(y) { return Math.floor(y) + " percent" }
    });

    // Legend
    // Make the element
    $('<div>')
      .addClass('legend')
      .appendTo(this.$el)
    ;
    // Add basic legend
    var legend = new Rickshaw.Graph.Legend({
      graph: graph,
      element: this.$('.legend')[0]
    });
    // Add toggle behavior
    new Rickshaw.Graph.Behavior.Series.Toggle({
      graph: graph,
      legend: legend
    });
    // Add highlight behavior
    new Rickshaw.Graph.Behavior.Series.Highlight({
      graph: graph,
      legend: legend
    });

    // Add axes
    //var time = new Rickshaw.Fixtures.Time();
    var xAxis = new Rickshaw.Graph.Axis.Time({
      graph: graph
      //timeUnit: time.unit('day')
    });
    var yAxis = new Rickshaw.Graph.Axis.Y({
      graph: graph
    });

    // Render graph and axes
    graph.render();
    xAxis.render();
    yAxis.render();
  };

  protoProps.template = false;

  protoProps.initialize = function (options) {
    Backbone.Courier.add(this);
    this.measurementsData = new MeasurementsData({measurements: options.data});
    this.listenTo(this.measurementsData, 'measurements:update', function () {
      this.graph.update();
    });
  };

  protoProps.onRender = function () {
    this.rickshawPlot();
  };

  return Backbone.Marionette.ItemView.extend(protoProps, staticProps);
});
