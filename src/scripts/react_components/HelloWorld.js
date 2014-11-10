// jshint quotmark: false
define([
  'react'
], function (React) {
  'use strict';

  var HelloWorld = React.createClass({displayName: 'HelloWorld',
    render: function () {
      return React.createElement("div", null, "Hello, ", this.props.name, "!");
    }
  });


  return {
    render: function (mountNode, name) {
      // jshint expr: true
      name || (name = 'World');
      // jshint expr: false
      React.render(React.createElement(HelloWorld, {name: name}), mountNode);
    }
  };
});
