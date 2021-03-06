define([
  'views/pages/Register',
  'appState',
  'appMediator'
], function (RegisterView, appState, appMediator) {
  'use strict';

  return function () {
    var isAuthenticated = appMediator.execute('isAuthenticated');
    if (isAuthenticated) {
      var userId = appMediator.execute('getUserId'),
        redirectUrl = 'user/' + userId;
      appMediator.execute('navigate', redirectUrl, {trigger: true});
    } else {
      this.show(new RegisterView());
    }
  };
});
