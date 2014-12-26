define([
  'views/pages/LandingPage',
  //'appState',
  'appMediator'
], function (LandingPageView, appMediator) {
  'use strict';

  return function () {
    var isAuthenticated = appMediator.execute('isAuthenticated');
    if (isAuthenticated) {
      var userId = appMediator.execute('getUserId'),
        redirectUrl = 'user/' + userId;
      appMediator.execute('navigate', redirectUrl, {trigger: true, replace: true});
    } else {
      this.show(new LandingPageView());
    }
  };
});
