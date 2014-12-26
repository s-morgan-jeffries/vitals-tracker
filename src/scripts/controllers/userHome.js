define([
  'views/pages/UserHome',
  //'appState',
  'appMediator'
], function (UserHomeView, appMediator) {
  'use strict';

  return function () {
    var isAuthenticated = appMediator.execute('isAuthenticated');
    if (isAuthenticated) {
      //console.log(appState.user);
      var user = appMediator.execute('getUser');
      //console.log(user);
      this.show(new UserHomeView({model: user}));
    } else {
      appMediator.execute('goTo', 'home');
    }
  };
});
