define([
  'underscore',
  'backbone',
  'moment'
], function (_, Backbone, moment) {
  var vitalsMeasurementProps = {},
    builtInEvents = [
      "add",
      "remove",
      "reset",
      "sort",
      "change",
      "destroy",
      "request",
      "sync",
      "error",
      "invalid",
      "route"/*,
       'all',
       'doodoo'*/
    ];

  // Events:
//  "add" (model, collection, options) — when a model is added to a collection.
//  "remove" (model, collection, options) — when a model is removed from a collection.
//  "reset" (collection, options) — when the collection's entire contents have been replaced.
//  "sort" (collection, options) — when the collection has been re-sorted.
//  "change" (model, options) — when a model's attributes have changed.
//  "change:[attribute]" (model, value, options) — when a specific attribute has been updated.
//  "destroy" (model, collection, options) — when a model is destroyed.
//  "request" (model_or_collection, xhr, options) — when a model or collection has started a request to the server.
//  "sync" (model_or_collection, resp, options) — when a model or collection has been successfully synced with the server.
//  "error" (model_or_collection, resp, options) — when model's or collection's request to remote server has failed.
//  "invalid" (model, error, options) — when a model's validation fails on the client.
//  "route:[name]" (params) — Fired by the router when a specific route is matched.
//  "route" (route, params) — Fired by the router when any route has been matched.
//  "route" (router, route, params) — Fired by history when any route has been matched.
//  "all" — this special event fires for any triggered event, passing the event name as the first argument.

  vitalsMeasurementProps.initialize = function (attrs) {

    attrs || (attrs = {});

    // Add a createdAt property with the current time
    // So dates. When you create a Date in JS, it's represented using the timezone on your local machine. Presumably
    // this is because the only way it can know the time is by using system time or by accessing the network, and it's
    // clearly not doing the latter. Anyway, a date instance is associated with a particular timezone, but it's based
    // on the number of milliseconds since January 1, 1970 UTC (which is roughly the same as GMT). There are a couple of
    // important things here. One is that dates, regardless of their timezone, have an underlying value (returned by
    // calling their valueOf method) that is comparable to other dates. However, the only way you'd have two dates with
    // different timezones on the same machine is if the system's timezone changed between the time the two dates were
    // created. For persisting dates, you should convert them using their toJSON method, which internally calls the
    // toISOString method. It returns a string representation of the date in ISO format, which is a specific format of
    // its UTC time. The Date constructor can create dates by parsing date strings in ISO format, UTC format,
    // locality-sensitive format, or standard format, but you should use ISO format since that's the international
    // standard and should work in the widest range of environments.


//    this.set('createdAt', new Date());

    // Attach handlers for built-in events
    var self = this;
    _.each(builtInEvents, function (eventName) {
      self.on(eventName, function () {
        console.log('Todo:' + eventName);
      });
    });

    // Vitals measurements should only belong to a single collection. If they're removed from that collection, they
    // should be destroyed.
    this.on('remove', function () {
      this.destroy();
    }, this);

  };

  vitalsMeasurementProps.defaults = function () {
    var now = moment();
    return {
      createdAt: now,
      measuredAt: now,
      updatedAt: now,
      temperature: null,
      pulse: null,
      sbp: null,
      dbp: null,
      respirations: null,
      saturation: null
    };
  };

  vitalsMeasurementProps.validate = function (attrs) {
    var now = moment();
    if (attrs.measuredAt > now) {
      return 'measuredAt cannot be in the future';
    }
//    if (!(_.isNull(attrs.temperature) || _.isUndefined(attrs.temperature))) {
//      if (!_.isNumber(attrs.temperature)) {
//        return 'Temperature must be numeric';
//      }
//      if (_.isNaN(attrs.temperature)) {
//        return 'Temperature must not be NaN';
//      }
//    }
//    if (!(_.isNull(attrs.pulse) || _.isUndefined(attrs.pulse))) {
//      if (!_.isNumber(attrs.pulse)) {
//        return 'Pulse must be numeric';
//      }
//      if (_.isNaN(attrs.pulse)) {
//        return 'Pulse must not be NaN';
//      }
//    }
//    if (!(_.isNull(attrs.sbp) || _.isUndefined(attrs.sbp))) {
//      if (!_.isNumber(attrs.sbp)) {
//        return 'SBP must be numeric';
//      }
//      if (_.isNaN(attrs.sbp)) {
//        return 'SBP must not be NaN';
//      }
//    }
//    if (!(_.isNull(attrs.dbp) || _.isUndefined(attrs.dbp))) {
//      if (!_.isNumber(attrs.dbp)) {
//        return 'DBP must be numeric';
//      }
//      if (_.isNaN(attrs.dbp)) {
//        return 'DBP must not be NaN';
//      }
//    }
//    if (!(_.isNull(attrs.respirations) || _.isUndefined(attrs.respirations))) {
//      if (!_.isNumber(attrs.respirations)) {
//        return 'Respirations must be numeric';
//      }
//      if (_.isNaN(attrs.respirations)) {
//        return 'Respirations must not be NaN';
//      }
//    }
//    if (!(_.isNull(attrs.saturation) || _.isUndefined(attrs.saturation))) {
//      if (!_.isNumber(attrs.saturation)) {
//        return 'Saturation must be numeric';
//      }
//      if (_.isNaN(attrs.saturation)) {
//        return 'Saturation must not be NaN';
//      }
//      if (attrs.saturation < 0 || attrs.saturation > 100) {
//        return 'Saturation must be between 0 and 100';
//      }
//    }
//    this.trigger('valid', this, attrs)
  };

  vitalsMeasurementProps.parse = function (response, options) {
    // createdAt
    if (response.createdAt) {
      response.createdAt = moment(response.createdAt);
    }
    // measuredAt
    if (response.measuredAt) {
      response.measuredAt = moment(response.measuredAt);
    }
    // updatedAt
    if (response.updatedAt) {
      response.updatedAt = moment(response.updatedAt);
    }

    return response;
  };

  return Backbone.Model.extend(vitalsMeasurementProps);
});