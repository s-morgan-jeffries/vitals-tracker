define([
  'underscore',
  'backbone',
  'moment'
], function (_, Backbone/*, moment*/) {
  'use strict';

  var instanceProps = {},
    staticProps = {};

  //instanceProps.localStorage = new Backbone.LocalStorage('Measurement');

  instanceProps.initialize = function () {

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

    //this.isEditing = false;

    // This means the measurement will update the updatedAt attribute anytime something changes
    this.on('change', function () {
      // Passing {silent: true} prevents an infinite loop
      this.set({updatedAt: new Date()}, {silent: true});
    });

  };

  //instanceProps.toggleEdit = function (editingState) {
  //  editingState = _.isUndefined(editingState) ? !this.isEditing : !!editingState;
  //  this.isEditing = editingState;
  //  this.trigger('toggleEdit', this);
  //};

  instanceProps.validation = {
    createdAt: {
      required: true,
      isValidDate: true
    },
    measuredAt: {
      required: true,
      isValidDate: true,
      //isDate: false,
      lteAttr: 'updatedAt'
    },
    updatedAt: {
      required: true,
      isValidDate: true
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

  instanceProps.defaults = function () {
    var now = new Date();
    return {
      createdAt: now,
      measuredAt: now,
      updatedAt: now
    };
  };

  instanceProps.reset = function (attrs) {
    var defaults = _.result(this, 'defaults');
    // jshint expr: true
    attrs || (attrs = {});
    // jshint expr: false
    attrs = _.defaults(attrs, defaults);
    this.clear();
    this.set(attrs);
    this.trigger('measurement:reset', this);
  };

  instanceProps.parse = function (response/*, options*/) {
    //console.log(response);
    if (_.isObject(response)) {
      _.each(['createdAt', 'measuredAt', 'updatedAt'], function (attr) {
        if (attr in response) {
          response[attr] = new Date(response[attr]);
        }
      });
    }

    return response;
  };


  return Backbone.Model.extend(instanceProps, staticProps);
});
