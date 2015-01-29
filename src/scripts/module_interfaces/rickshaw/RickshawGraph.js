define(function (require) {
  'use strict';

  var _ = require('underscore'),
    Backbone = require('backbone'),
    d3 = require('d3'),
    Rickshaw = require('rickshaw'),
    $ = Backbone.$;

  // Terms:
  // series: An array containing all the data and configuration info for the collection, formatted for Rickshaw. This
  //  will be passed directly to the Rickshaw graph.
  // attrSeries: A single element from the series, which contains all the data and configuration info for a single
  //  attribute.
  // attrData: The data array from an attrSeries.
  // modelDatum: The model data associated with a single attribute. This consists of a time (x), a value (y), and the
  //  model's cid.
  // modelData: A concept more than a data structure, this represents all the data (the plural of datum, which is
  //  what the term is emphasizing) associated with a single model. In practice, the model itself is what's passed
  //  around.

  // Utility function to get the data array from a named series
  var getAttrData = function (series, attr) {
    for (var i = series.length; i--;) {
      var attrSeries = series[i];
      if (attrSeries.attr === attr) {
        return attrSeries.data;
      }
    }
  };

  // Utility function to get the index of a given datum within an array of series data
  var findModelDatum = function (model, attrData) {
    // Since Backbone generates a unique cid for every model, we can just use that to identify data from a given model
    // within a series.
    var cid = model.cid;
    for (var i = attrData.length; i--;) {
      var attrDatum = attrData[i];
      if (attrDatum.cid === cid) {
        return i;
      }
    }
    return -1;
  };

  // Utility function to get the Rickshaw-formatted time from a datum (Rickshaw uses seconds instead of milliseconds)
  var getModelDataTime = function (model, timeAttr) {
    // jshint bitwise: false
    return model.get(timeAttr).valueOf() / 1000 >> 0;
    // jshint bitwise: true
  };

  // Comparator for data, used for sorting. We'll always want to sort a series by time, and Rickshaw uses the `x`
  // property to represent that.
  var comparator = function (a, b) {
    return a.x - b.x;
  };

  // Function to check for existence
  var exists = function (val) {
    return val !== void 0 && val !== null;
  };

  // Constructor function for RickshawData
  var RickshawData = function (collection, dataConfig) {
    // Store a reference to the collection (may or may not really need this)
    //this.collection = collection;

    // The series is the only thing we're going to expose publicly
    var series = this.series = [],
      attrs = this._attrs = [],
      self = this;

    _.each(dataConfig, function (config) {
      // Check to see if this is the time attribute
      if (config.isTime) {
        // If it is, set the timeAttr property on the instance and return
        self._timeAttr = config.attr;
        return;
      }
      // Otherwise, create a new data series using the configuration info
      series.push({
        color: config.color,
        name: config.key,
        data: [],
        attr: config.attr
      });
      // Add the attribute to the list of series names (
      attrs.push(config.attr);
    });

    // Add all the data
    collection.forEach(function (model) {
      // Don't sort initially
      self._addModelData(model, {sort: false});
    });

    // Sort the data series
    _.each(attrs, function (attr) {
      getAttrData(series, attr).sort(comparator);
    });

    // Add a single listener
    this.listenTo(collection, 'all', this._delegateEvent);
  };

  _.extend(RickshawData.prototype, Backbone.Events, {

    // Check to see if there are any data in the series
    hasData: function () {
      var series = this.series;
      // Loop through each attrSeries
      for (var i = series.length; i--;) {
        if (series[i].data.length) {
          // If any of the attrData has a length, then the series contains data, so return true
          return true;
        }
      }
      // If we haven't returned by now, there's no data, so return false
      return false;
    },

    // The sole event listener. You have to listen for `all` in order to get all the `change:whatever` events, so we
    // might as well delegate all the events from here.
    _delegateEvent: function () {
      var eventName = arguments[0],
        primaryEventName = eventName.split(':')[0],
        args = [].slice.call(arguments, 1),
        changedAttr;

      switch (primaryEventName) {
        case 'add':
          // Delegate to addModelData for `add` events
          this._addModelData.apply(this, args);
          break;
        case 'remove':
          // Delegate to removeModelData for `remove` events
          this._removeModelData.apply(this, args);
          break;
        case 'change':
          // First check to see whether there is a changed attribute (ignore generic `change` event)
          if ((changedAttr = eventName.split(':')[1])) {
            if (_.contains(this._attrs, changedAttr)) {
              // If the changedAttr matches one of the series names, call updateModelDatum with the modelData (args[0])
              // and the attribute name
              this._updateModelDatum(args[0], changedAttr);
            } else if (changedAttr === this._timeAttr) {
              // If the changed attribute is the time attribute, call updateModelDataTime with the modelData (args[0])
              this._updateModelDataTime(args[0]);
            }
          }
          break;
      }
    },

    // Add data from a model to the series
    _addModelData: function (model, options) {
      var series = this.series,
        modelDataTime = getModelDataTime(model, this._timeAttr),
        doSort = true,
        cid = model.cid,
        i, attr, seriesData, val;
      // jshint expr: true
      options || (options = {});
      // jshint expr: false
      if (options.sort === false) {
        // Don't sort if options.sort is explicitly set to false
        doSort = false;
      }
      for (i = series.length; i--;) {
        // The attribute for the series
        attr = series[i].attr;
        // The data array from the series
        seriesData = series[i].data;
        // The value of the attribute from the model
        val = model.get(attr);
        if (exists(val)) {
          // If the model's value for this attribute is not null or undefined, push a new datum onto the data array
          seriesData.push({
            x: modelDataTime,
            y: val,
            cid: cid
          });
          // Sort here if we're sorting
          if (doSort) {
            seriesData.sort(comparator);
          }
        } else {
          //// If the model's value for this attribute is not null or undefined, push a new datum onto the data array
          //seriesData.push({
          //  x: modelDataTime,
          //  y: null,
          //  cid: cid
          //});
          //// Sort here if we're sorting
          //if (doSort) {
          //  seriesData.sort(comparator);
          //}
        }
      }
      // Trigger an event to indicate that the data have been updated
      this.trigger('rickshawdata:add');
    },

    // Update the model datum for a given attribute
    _updateModelDatum: function (model, attr) {
      var attrData = getAttrData(this.series, attr),
        idx = findModelDatum(model, attrData),
        val = model.get(attr);

      if (exists(val)) { // If the value exists (i.e. is not null or undefined)
        // jshint bitwise: false
        if (~idx) { // If it is in the array ("~idx" means the index *does* exist), just update the value
          // jshint bitwise: true
          attrData[idx].y = val;
        } else { // If it's not in the array, it should be added
          attrData.push({
            x: getModelDataTime(model, this._timeAttr),
            y: val,
            cid: model.cid
          });
          attrData.sort(comparator);
        }
      } else { // If the value does not exist
        // jshint bitwise: false
        if (~idx) { // If the datum is in the array, it should be removed
          // jshint bitwise: true
          attrData.splice(idx, 1);
        }
      }
      this.trigger('rickshawdata:update');
    },

    // Update the time attribute of the the modelData. This requires looping through each attribute series, updating
    // the modelDatum time, and sorting the series.
    _updateModelDataTime: function (model) {
      var series = this.series,
        modelDataTime = getModelDataTime(model, this._timeAttr);
      for (var i = series.length; i--;) {
        var seriesData = series[i].data,
          idx = findModelDatum(model, seriesData);
        // jshint bitwise: false
        if (~idx) { // If the modelDatum exists, update its time and sort the array
          // jshint bitwise: true
          seriesData[idx].x = modelDataTime;
          seriesData.sort(comparator);
        }
      }
      this.trigger('rickshawdata:update');
    },

    // Remove all the data associated with a model
    _removeModelData: function (datum) {
      var series = this.series;
      for (var i = series.length; i--;) {
        var seriesData = series[i].data,
          idx = findModelDatum(datum, seriesData);
        // jshint bitwise: false
        if (~idx) { // If the modelDatum exists, remove it
          // jshint bitwise: true
          seriesData.splice(idx, 1);
        }
      }
      this.trigger('rickshawdata:remove');
    }
  });

  // Modified version of Rickshaw.Graph that overrides the built-in dataDomain method. The reason for doing this is
  // that several Rickshaw add-ons call the graph's dataDomain method, but it throws an error if *any* of the series
  // contain no data. This constructor will return a graph object that is identical to a native Rickshaw.Graph with the
  // exception of its dataDomain method. If there are no data in any of the series, it will return [undefined, undefined],
  // which will still probably produce an error, but as long as one of the series has data, everything should be okay.
  var RickshawGraph = function () {
    Rickshaw.Graph.apply(this, arguments);

    this.dataDomain = function() {
      var data = this.series.map( function(s) { return s.data; } );
      var min = d3.min(data.map(function(d) {
        var d0 = d[0];
        return d0 && d0.x;
      }));
      var max = d3.max(data.map(function(d) {
        var dTerm = d[d.length - 1];
        return dTerm && dTerm.x;
      }));

      return [min, max];
    };
  };

  var RickshawGraphView = Backbone.View.extend({

    initialize: function (options) {
      this._options = _.omit(options, 'dataConfig', 'collection');
      // Create RickshawData instance. This will manage mapping the collection to the data series and will update
      // whenever the collection does.
      var rickshawData = this._rickshawData = new RickshawData(this.collection, options.dataConfig);
      // Add listeners for adding or removing the slider. These (or at least _removeSlider) have to be added before
      // the _updateGraph callback so that you don't get an error when you try to update a graph with no data.
      if (options.rangeSlider) {
        this.listenTo(rickshawData, 'rickshawdata:add', this._addSlider);
        this.listenTo(rickshawData, 'rickshawdata:remove', this._removeSlider);
      }
      // Add a listener to update the graph whenever the data are updated
      this.listenTo(rickshawData, 'rickshawdata:add rickshawdata:update rickshawdata:remove', this._updateGraph);
    },

    //
    render: function () {
      this._createGraph();
      return this;
    },

    remove: function () {
      // Remove listeners from RickshawData instance
      this._rickshawData.stopListening();
      // Destroy the graph. Not sure this is necessary, since we're already removing the element (by delegating to
      // Backbone.View.remove), and there shouldn't be any listeners here.
      this._destroyGraph();
      // This will handle removing the event listeners from the view
      return Backbone.View.prototype.remove.call(this);
    },

    // Method for resizing the graph
    resize: function (size) {
      var graph = this._rickshawObjects && this._rickshawObjects.graph;
      if (graph) {
        graph.configure(size);
        graph.update();
      }
    },

    _createGraph: function () {
      var $graphEl = this.$el,
        options = this._options,
        graphConfig = {
          element: $graphEl[0],
          series: this._rickshawData.series,
          renderer: options.renderer || 'lineplot',
          interpolation: options.interpolation || 'linear'
        },
        graph,
        rickshawObjects;

      // Clean up the old graph if it exists
      this._destroyGraph();

      // Create basic graph
      rickshawObjects = this._rickshawObjects = {};
      graph = rickshawObjects.graph = new RickshawGraph(graphConfig);


      // Add axes
      //var time = new Rickshaw.Fixtures.Time();
      rickshawObjects.xAxis = new Rickshaw.Graph.Axis.Time({
        graph: graph
        //timeUnit: time.unit('day')
      });
      rickshawObjects.yAxis = new Rickshaw.Graph.Axis.Y({
        graph: graph
      });

      // Legend
      // Add basic legend
      var legend = rickshawObjects.legend = new Rickshaw.Graph.Legend({
        graph: graph,
        element: $('<div>').appendTo($graphEl)[0]
      });

      // Add hover detail
      if (options.hover) {
        rickshawObjects.hoverDetail = new Rickshaw.Graph.HoverDetail({
          graph: graph
          //,
          //xFormatter: function(x) { return x + "seconds" },
          //yFormatter: function(y) { return Math.floor(y) + " percent" }
        });
      }
      // Add toggle behavior
      if (options.toggle) {
        rickshawObjects.toggle = new Rickshaw.Graph.Behavior.Series.Toggle({
          graph: graph,
          legend: legend
        });
      }
      // Add highlight behavior
      if (options.highlight) {
        rickshawObjects.highlight = new Rickshaw.Graph.Behavior.Series.Highlight({
          graph: graph,
          legend: legend
        });
      }
      // Add slider bar
      if (options.rangeSlider) {
        // The rangeSlider will break if you try to use it on a graph with no data, so you have to do some work to
        // prevent that from happening. There are listeners on the rickshawData already for adding and removing the
        // rangeSlider when data are added and removed, but if you start with a collection that already has all of its
        // data (and therefore won't trigger the `rickshawdata:add` event), you need to add the rangeSlider manually,
        // which is what happens here.
        if (this._rickshawData.hasData()) {
          this._addSlider();
        }
      }

      // Render graph and axes
      graph.render();
    },

    _addSlider: function () {
      //console.log('_addSlider');
      var rickshawObjects = this._rickshawObjects;
      // If the graph hasn't been created, or if the rangeSlider already exists, return now
      if (!rickshawObjects || rickshawObjects.rangeSlider) {
        return;
      }
      var graph = rickshawObjects.graph,
        graphUpdateCallbacks = graph.updateCallbacks,
        callbackIdx = graphUpdateCallbacks.length,
        $graphEl = $(graph.element),
        $sliderEl = $('<div>').appendTo($graphEl),
        origCallback;
      // Create the RangeSlider instance and store a reference so we can remove it later
      var rangeSlider = rickshawObjects.rangeSlider = new Rickshaw.Graph.RangeSlider({
        graph: graph,
        element: $sliderEl[0]
      });
      // Get the callback that was just created
      origCallback = graphUpdateCallbacks[callbackIdx];
      // Create a new wrapped callback that will also resize the slider bar. Store a reference to it so we can remove
      // it later.
      var graphUpdateCallback = rangeSlider.graphUpdateCallback = function () {
        // Call the original callback
        origCallback();
        // Resize the rangeSlider
        $sliderEl.width(graph.width, 'px');
      };
      // Replace the original callback in the graph's updateCallbacks array
      graphUpdateCallbacks.splice(callbackIdx, 1, graphUpdateCallback);
    },

    _removeSlider: function () {
      var rickshawObjects = this._rickshawObjects,
        rickshawData = this._rickshawData;
      // If the graph hasn't been created, or if there are still data, return now
      if (!rickshawObjects || rickshawData.hasData()) {
        return;
      }
      var graphUpdateCallbacks = rickshawObjects.graph.updateCallbacks,
        rangeSlider = rickshawObjects.rangeSlider,
        callbackIdx = graphUpdateCallbacks.indexOf(rangeSlider.graphUpdateCallback),
        $sliderEl = $(rangeSlider.element);
      // Remove the update callback for the slider
      graphUpdateCallbacks.splice(callbackIdx, 1);
      // Remove the slider element
      $sliderEl.remove();
      // Delete the reference to the slider
      delete rickshawObjects.rangeSlider;
    },

    _updateGraph: function () {
      // jshint expr: true
      // Check that the graph exists and, if so, update it
      this._rickshawObjects && this._rickshawObjects.graph && this._rickshawObjects.graph.update();
      // jshint expr: false
    },

    // This should essentially undo anything that was done by _createGraph
    _destroyGraph: function () {
      // Get a reference to the graph's element (which is also the view's element)
      var $graphEl = this.$el;
      // Right now, all the elements related to the graph are children of the top-level element. Therefore, emptying
      // the top-level element will delete all of them.
      $graphEl.empty();
      // The only other change made by Rickshaw is that it adds this class to the graph element
      $graphEl.removeClass('rickshaw_graph');
      // Delete the reference to the rickshaw objects
      delete this._rickshawObjects;
    }

  }, {});

  return RickshawGraphView;
});
