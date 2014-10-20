define([
  'underscore',
  'backbone',
  'moment'
], function (_, Backbone, moment) {
  var modelProps = {};

  modelProps.initialize = function () {

//    // Add a createdAt property with the current time
//    // So dates. When you create a Date in JS, it's represented using the timezone on your local machine. Presumably
//    // this is because the only way it can know the time is by using system time or by accessing the network, and it's
//    // clearly not doing the latter. Anyway, a date instance is associated with a particular timezone, but it's based
//    // on the number of milliseconds since January 1, 1970 UTC (which is roughly the same as GMT). There are a couple of
//    // important things here. One is that dates, regardless of their timezone, have an underlying value (returned by
//    // calling their valueOf method) that is comparable to other dates. However, the only way you'd have two dates with
//    // different timezones on the same machine is if the system's timezone changed between the time the two dates were
//    // created. For persisting dates, you should convert them using their toJSON method, which internally calls the
//    // toISOString method. It returns a string representation of the date in ISO format, which is a specific format of
//    // its UTC time. The Date constructor can create dates by parsing date strings in ISO format, UTC format,
//    // locality-sensitive format, or standard format, but you should use ISO format since that's the international
//    // standard and should work in the widest range of environments.


    // Don't do this. Instead, to remove measurements from a collection, destroy them, which will automatically remove
    // them from the collection.
    // Vitals measurements should only belong to a single collection. If they're removed from that collection, they
    // should be destroyed.
//    this.on('remove', function () {
//      this.destroy();
//    }, this);

  };

  modelProps.validation = {
    createdAt: {
      required: true,
      isDate: true
    },
    measuredAt: {
      required: true,
      isDate: true
    },
    updatedAt: {
      required: true,
      isDate: true
    },
    temperature: {
      isNumber: true,
      isNaN: false,
      required: false
    },
    pulse: {
      min: 0,
      isNumber: true,
      isNaN: false,
      required: false
    },
    sbp: {
      gtAttr: 'dbp',
      isNumber: true,
      isNaN: false,
      required: false
    },
    dbp: {
      ltAttr: 'sbp',
      isNumber: true,
      isNaN: false,
      required: false
    },
    respirations: {
      min: 0,
      isNumber: true,
      isNaN: false,
      required: false
    },
    saturation: {
      range: [0, 100],
      isNumber: true,
      isNaN: false,
      required: false
    }
  };

  modelProps.defaults = function () {
    var now = moment();
    return {
      createdAt: now,
      measuredAt: now,
      updatedAt: now
    };
  };

  modelProps.parse = function (response, options) {
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

  return Backbone.Model.extend(modelProps);
});