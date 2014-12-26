var loginView;

define([
  'views/pages/Login',
  'models/User',
  //'appState',
  'appMediator'
], function (LoginView, User, appMediator) {
  'use strict';

  return function () {
    var isAuthenticated = appMediator.execute('isAuthenticated');
    if (isAuthenticated) {
      var userId = appMediator.execute('getUserId'),
        redirectUrl = 'user/' + userId;
      appMediator.execute('navigate', redirectUrl, {trigger: true});
    } else {
      var user = new User();
      loginView = new LoginView({model: user});
      this.show(loginView);
    }
  };
});
