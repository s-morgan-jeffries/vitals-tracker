define([
  'collections/Collection',
  'models/Book',
  'apiUrl'
], function (Collection, Book, apiUrl) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.model = Book;

  //protoProps.initialize = function (models, options) {
  //  options = options || {};
  //  this.url = options.url || this.url;
  //  //if (options.url) {
  //  //  this.url = options.url;
  //  //}
  //};

  protoProps.url = function () {
    return apiUrl('books');
  };

  return Collection.extend(protoProps, staticProps);
});
