define([
  'models/Model',
  'apiUrl'
], function (Model, apiUrl) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.stale = ['paid'];

  protoProps.url = function () {
    return apiUrl('book', {id: this.id});
  };

  protoProps.parse = function (response) {
    if (typeof response === 'object' && response.publicationDate) {
      response.publicationDate = new Date(response.publicationDate);
    }
    return response;
  };

  return Model.extend(protoProps, staticProps);
});
