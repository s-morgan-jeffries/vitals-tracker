define([
  'collections/Collection',
  'presenters/Authors',
  'models/Author',
  'apiUrl'
], function (Collection, AuthorsPresenter, Author, apiUrl) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.presenter = AuthorsPresenter;

  protoProps.model = Author;

  protoProps.url = function () {
    return apiUrl('authors');
  };

  return Collection.extend(protoProps, staticProps);
});
