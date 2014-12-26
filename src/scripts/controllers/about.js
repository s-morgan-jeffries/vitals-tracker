define([
  'views/pages/About'
], function (AboutView) {
  'use strict';

  return function () {
    this.show(new AboutView());
  };
});
