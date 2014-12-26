// jshint quotmark: false
define([
  '../../bower_components/react/react'
], function (React) {
  'use strict';

  var HelloWorld = React.createClass({
    render: function () {
      return <div>Hello, {this.props.name}!</div>;
    }
  });


  return {
    render: function (mountNode, name) {
      // jshint expr: true
      name || (name = 'World');
      // jshint expr: false
      React.render(<HelloWorld name={name} />, mountNode);
    }
  };
});
