define([
  'underscore',
  'backbone',
  'collections/Collection',
  'loopBackConnection'
], function (_, Backbone, Collection, loopBackConnection) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.sync = loopBackConnection.sync;

  protoProps.findOne = function (filter) {
    // The filter should contain where as a property, but if it doesn't change that here.
    if (!('where' in filter)) {
      filter = {
        where: filter
      };
    }
    // Set options for the request
    var options = {
      url: _.result(this, 'url') + '/findOne',
      data: {
        filter: filter
      }
      //,
      //success: function (model, response) {
      //  console.log(response);
      //  //model.set
      //  model.trigger('found');
      //},
      //error: function (model, response) {
      //  console.log(response);
      //  if (response.status === 404) {
      //    model.trigger('notfound');
      //  }
      //}
    };
    var found = new (this.model)(filter.where);
    //found.listenTo(found, 'all', function () {
    //  console.log(arguments);
    //});
    found.fetch(options);
    return found;
  };

  protoProps.count = function () {
    var count = _.extend({}, Backbone.Events, { count: undefined, resolved: false });
    //count.listenTo(count, 'all', function () {
    //  console.log(arguments);
    //});
    // Set options for the request
    var options = {
      url: _.result(this, 'url') + '/count',
      success: function (model, response) {
        //console.log(response);
        count.count = response.count;
        count.resolved = true;
        count.trigger('resolved');
      },
      error: function () {
        count.count = null;
        count.resolved = true;
        count.trigger('resolved');
        count.trigger.apply(count, ['error'].concat([].slice.call(arguments)));
      }
    };
    var proxy = new (Backbone.Model)();
    proxy.fetch(options);
    return count;
  };

  return Collection.extend(protoProps, staticProps);
});
