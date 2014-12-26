define([
  'backbone',
  'appMediator',
  'models/Model',
  'models/User',
  'presenters/AppStatePresenter'
], function (Backbone, appMediator, Model, User, AppStatePresenter) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  // Keep this saved in sessionStorage
  protoProps.sessionStorage = new Backbone.SessionStorage('vitals-tracker-session');

  // Don't persist these things
  protoProps.stale = ['userId', 'user', 'patients'];

  protoProps.presenter = AppStatePresenter;

  protoProps.initialize = function () {

    // We want to use the same appState object every time, so we give it a fixed id here.
    this.set('id', '1');

    // Event handlers
    this.listenTo(appMediator, 'login', this.onLogin);
    this.listenTo(appMediator, 'logout', this.onLogout);
    this.listenTo(this, 'change:token', this.onChangeToken);
    this.listenTo(appMediator, 'app:start', this.onAppStart);

    // Commands
    appMediator.registerCommand('getSavedToken', this.getSavedToken, this);
    appMediator.registerCommand('getUserId', this.getUserId, this);
    appMediator.registerCommand('getUser', this.getUser, this);
    appMediator.registerCommand('getPatients', this.getPatients, this);

    // Now that the handlers are registered, check sessionStorage for saved appState
    this.fetch();
  };

  protoProps.onAppStart = function () {
    var user = this.get('user');
    if (user && appMediator.execute('isAuthenticated')) {
      user.fetch();
    }
  };

  // Event handlers
  protoProps.onLogin = function (token) {
    this.save({token: token});
  };

  protoProps.onLogout = function () {
    this.unset('token');
    this.save();
  };

  protoProps.onChangeToken = function (model, token) {
    if (token) {
      var userId = token.userId,
        user = new User({id: token.userId});
      // Set the current user and the userId as a convenience
      this.set({userId: userId, user: user});
      // If we're authenticated, we can fetch the user from the backend.
      if (appMediator.execute('isAuthenticated')) {
        user.fetch();
      }
    } else {
      // If the token doesn't exist, unset the userId and user.
      this.unset('userId');
      this.unset('user');
    }
  };

  // Commands
  protoProps.getSavedToken = function () {
    //console.log('getToken');
    return this.get('token');
  };

  protoProps.getUserId = function () {
    return this.get('userId');
  };

  protoProps.getUser = function () {
    return this.get('user');
  };

  protoProps.getPatients = function () {
    var user = this.get('user');
    return user.patients;
  };

  return new (Model.extend(protoProps, staticProps))();
});
