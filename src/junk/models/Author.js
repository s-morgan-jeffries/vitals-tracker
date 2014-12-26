define([
  'models/Model',
  'collections/Books',
  'presenters/Author',
  'apiUrl'
], function (Model, Books, AuthorPresenter, apiUrl) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.presenter = AuthorPresenter;

  protoProps.initialize = function (options) {
    Model.prototype.initialize.call(this, options);
    if (!this.isNew()) {
      this.getBooks();
    }
    this.listenTo(this, 'change:id', this.getBooks);
  };

  protoProps.getBooks = function () {
    var self = this;
    this.books = new Books(this.get('books'), {
      url: function () {
        return apiUrl('author books', {id: self.id});
      }
    });
    this.books.fetch();
  };

  //protoProps.addBook = function (book) {
  //  var url;
  //  if (book instanceof Books.model) {
  //
  //  } else {
  //
  //  }
  //};

  return Model.extend(protoProps, staticProps);
});
