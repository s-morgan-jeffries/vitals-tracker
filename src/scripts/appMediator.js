define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  // The AppMediator constructor, which will be used to create the appMediator instance.
  var AppMediator = function () {
    this._commands = {};
  };

  // The appMediator has two sets of behaviors. First, it is an event aggregator, and those behaviors come from
  // Backbone.Events. Second, it implements the command pattern via the methods defined below.
  _.extend(AppMediator.prototype, Backbone.Events, {
    // Register a new command. Since commands are registered as properties of the _command object with the commandName
    // as their key, you can only have one command per commandName.
    registerCommand: function (commandName, command, context) {
      if (context) {
        command = command.bind(context);
      }
      this._commands[commandName] = command;
    },

    // This may or may not be needed, but there's no real downside to implementing it here.
    unregisterCommand: function (commandName) {
      delete this._commands[commandName];
    },

    // Here's how you execute a command. If the named command exists, it gets called with the provided arguments. If it
    // doesn't, nothing happens.
    execute: function (commandName) {
      var command = this._commands[commandName],
        args = [].slice.call(arguments, 1);
      if (command) {
        return command.apply(this, args);
      }
    }
  });

  // Return an instance of AppMediator as the module.
  return new AppMediator();
});
