define([
  '../../bower_components/underscore/underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var protoProps = {},
    staticProps = {};

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

  protoProps.initialize = function (options) {
    // jshint expr: true
    options || (options = {});
    // jshint expr: false
    this.measurements = options.measurements;
    this.initializeRickshawData();
    this.listenTo(this.measurements, 'all', this.delegateEvent);
  };

  protoProps.delegateEvent = function () {
    var eventName = arguments[0],
      primaryEventName = eventName.split(':')[0],
      args = [].slice.call(arguments, 1),
      changedAttr;

    //console.log(eventName);
    switch (primaryEventName) {
      case 'add':
        this.addMeasurement.apply(this, args);
        break;
      case 'remove':
        this.removeMeasurement.apply(this, args);
        break;
      case 'change':
        if ((changedAttr = eventName.split(':')[1]) && _.contains(this.measurementNames, changedAttr)) {
          this.updateMeasurement(args[0], changedAttr);
        } else if (changedAttr === 'measuredAt') {
          this.updateMeasurementTime(args[0]);
        }
        break;
    }
  };

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

  protoProps.updateMeasurement = function (measurement, attr) {
    var seriesData = getSeriesData(this.rickshawData, attr),
      idx = findMeasurement(seriesData, measurement),
      val = measurement.get(attr);

    // If the value is undefined and the measurement is in the array, it should be removed
    if (_.isUndefined(val)) {
      // jshint bitwise: false
      if (~idx) {
        // jshint bitwise: true
        seriesData.splice(idx, 1);
      }
    } else { // If the value is defined
      // jshint bitwise: false
      if (~idx) { // If it's not in the array, it should be added
        // jshint bitwise: true
        seriesData[idx].y = val;
      } else { // If it is in the array, just update the value
        seriesData.push({
          x: getMeasurementTime(measurement),
          y: val,
          cid: measurement.cid
        });
        seriesData.sort(measurementComparator);
      }
    }
    this.trigger('measurements:update');
  };

  protoProps.updateMeasurementTime = function (measurement) {
    var series = this.rickshawData,
      measuredAt = getMeasurementTime(measurement);
    for (var i = 0, len = series.length; i < len; i++) {
      var seriesData = series[i].data,
        idx = findMeasurement(seriesData, measurement);
      // jshint bitwise: false
      if (~idx) {
        // jshint bitwise: true
        seriesData[idx].x = measuredAt;
        seriesData.sort(measurementComparator);
      }
    }
    this.trigger('measurements:update');
  };

  protoProps.removeMeasurement = function (measurement) {
    var series = this.rickshawData;
    for (var i = 0, len = series.length; i < len; i++) {
      var seriesData = series[i].data,
        idx = findMeasurement(seriesData, measurement);
      // jshint bitwise: false
      if (~idx) {
      // jshint bitwise: true
        seriesData.splice(idx, 1);
      }
    }
    this.trigger('measurements:update');
  };

  protoProps.addMeasurement = function (measurement, options) {
    var series = this.rickshawData,
      measuredAt = getMeasurementTime(measurement),
      doSort = true;
    // jshint expr: true
    options || (options = {});
    // jshint expr: false
    if (options.sort === false) {
      doSort = false;
    }
    for (var i = 0, len = series.length; i < len; i++) {
      var measurementName = series[i].attr,
        seriesData = series[i].data,
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
    this.trigger('measurements:update');
  };

  protoProps.initializeRickshawData = function () {
    var series = this.rickshawData = [],
      measurementNames = this.measurementNames = [],
      self = this;

    _.each(dataConfig, function (config) {
      series.push({
        color: config.color,
        name: config.key,
        data: [],
        attr: config.attr
      });
      measurementNames.push(config.attr);
    });

    this.measurements.forEach(function (measurement) {
      self.addMeasurement(measurement, {sort: false});
    });
  };

  protoProps.onDestroy = function () {
    this.measurements = null;
  };

  return Backbone.Marionette.Controller.extend(protoProps, staticProps);
});
