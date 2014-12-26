define([
  'views/pages/Logout',
  'appState',
  'appMediator'
], function (LogoutView, appState, appMediator) {
  'use strict';

  return function () {
    var isAuthenticated = appMediator.execute('isAuthenticated');
    if (isAuthenticated) {
      var userId = appMediator.execute('getUserId'),
        redirectUrl = 'user/' + userId;
      appMediator.execute('navigate', redirectUrl, {trigger: true});
    } else {
      this.show(new LogoutView());
    }
  };
});
