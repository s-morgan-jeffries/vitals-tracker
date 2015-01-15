var measurementsGraph;
define([
  'underscore',
  'rickshaw',
  'views/View',
  'templates'
], function (_, Rickshaw, View, templates) {
  'use strict';

  var protoProps = {},
    staticProps = {},
    $ = View.$;

  var dataConfig = [
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
    }
  ];

  var getSeriesData = function (series, measurementName) {
    return series[_.pluck(series, 'attr').indexOf(measurementName)].data;
  };

  var findMeasurement = function (data, measurement) {
    return _.pluck(data, 'cid').indexOf(measurement.cid);
  };

  var getMeasurementTime = function (measurement) {
    // jshint bitwise: false
    return measurement.get('measuredAt').valueOf() / 1000 >> 0;
    // jshint bitwise: true
  };

  var measurementComparator = function (a, b) {
    return a.x - b.x;
  };

  protoProps.template = templates['partials/measurements-graph'];


  protoProps.initialize = function () {
    this.initializePlotData();
    this.listenTo(this.collection, 'add', this.addMeasurement);
    measurementsGraph = this;
  };

  // Initialize the plotData
  protoProps.initializePlotData = function () {
    var plotData = this.plotData = [],
      measurementNames = this.measurementNames = [],
      self = this;

    _.each(dataConfig, function (config) {
      plotData.push({
        color: config.color,
        name: config.key,
        data: [],
        attr: config.attr
      });
      measurementNames.push(config.attr);
    });

    // Add all the measurements
    this.collection.forEach(function (measurement) {
      self.addMeasurement(measurement, {sort: false});
    });
  };

  //
  protoProps.updateMeasurement = function (measurement, attr) {
    var plotData = getSeriesData(this.plotData, attr),
      graph = this.graph,
      idx = findMeasurement(plotData, measurement),
      val = measurement.get(attr);

    // If the value is undefined and the measurement is in the array, it should be removed
    if (_.isUndefined(val)) {
      // jshint bitwise: false
      if (~idx) {
        // jshint bitwise: true
        plotData.splice(idx, 1);
      }
    } else { // If the value is defined
      // jshint bitwise: false
      if (~idx) { // If it's not in the array, it should be added
        // jshint bitwise: true
        plotData[idx].y = val;
      } else { // If it is in the array, just update the value
        plotData.push({
          x: getMeasurementTime(measurement),
          y: val,
          cid: measurement.cid
        });
        plotData.sort(measurementComparator);
      }
    }
    graph.update();
  };

  //
  protoProps.updateMeasurementTime = function (measurement) {
    var plotData = this.plotData,
      graph = this.graph,
      measuredAt = getMeasurementTime(measurement);
    for (var i = 0, len = plotData.length; i < len; i++) {
      var seriesData = plotData[i].data,
        idx = findMeasurement(seriesData, measurement);
      // jshint bitwise: false
      if (~idx) {
        // jshint bitwise: true
        seriesData[idx].x = measuredAt;
        seriesData.sort(measurementComparator);
      }
    }
    graph.update();
  };

  protoProps.removeMeasurement = function (measurement) {
    var plotData = this.plotData;
    for (var i = 0, len = plotData.length; i < len; i++) {
      var seriesData = plotData[i].data,
        idx = findMeasurement(seriesData, measurement);
      // jshint bitwise: false
      if (~idx) {
        // jshint bitwise: true
        seriesData.splice(idx, 1);
      }
    }
  };

  protoProps.addMeasurement = function (measurement, options) {
    //console.log('adding');
    var plotData = this.plotData,
      graph = this.graph,
      measuredAt = getMeasurementTime(measurement),
      doSort = true;
    // jshint expr: true
    options || (options = {});
    // jshint expr: false
    if (options.sort === false) {
      doSort = false;
    }
    for (var i = 0, len = plotData.length; i < len; i++) {
      var measurementName = plotData[i].attr,
        seriesData = plotData[i].data,
        val = measurement.get(measurementName);
      if (!_.isUndefined(val)) {
        seriesData.push({
          x: measuredAt,
          y: val,
          cid: measurement.cid
        });
        if (doSort) {
          seriesData.sort(measurementComparator);
        }
      }
    }
    graph.update();
  };

  // Default _onRender method. It just returns the view.
  protoProps._onRender = function () {
    var graphConfig = {},
      graph;

    graphConfig.renderer = 'lineplot';

    graphConfig.element = this.el;

    //console.log(this.$el);

    graphConfig.series = this.plotData;
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

    return this;
  };

  return View.extend(protoProps, staticProps);
});
