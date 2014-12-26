//define([
//  'underscore',
//  'models/Model',
//  'models/User',
//  'apiUrl',
//  'plugins/loopBackConnection'
//], function (_, Model, UserModel, apiUrl, loopBackConnection) {
//  'use strict';
//
//  var User = {},
//    currentUser;
//
//  User.login = function (credentials) {
//    var proxy = new (Model.extend({ url: apiUrl('user login') }))(credentials);
//    var user = new UserModel(credentials);
//    // Set options for the request
//    var options = {
//      //url: apiUrl('user login'),
//      //data: credentials,
//      success: function (model, response) {
//        var accessToken = response.id;
//        loopBackConnection.setToken(accessToken);
//
//        user.set('id', response.userId);
//        user.fetch();
//        currentUser = user;
//      },
//      error: function (model, response) {
//        console.log('error');
//        console.log(arguments);
//        //console.log(response);
//      }
//    };
//    proxy.save(null, options);
//    return user;
//  };
//
//  User.logout = function () {
//    //var proxy = new Model();
//    loopBackConnection.logout();
//    currentUser = void 0;
//  };
//
//  User.isLoggedIn = function () {
//    return !!currentUser;
//  };
//
//  User.current = function () {
//    return currentUser;
//  };
//
//  return User;
//});
