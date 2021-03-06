// jshint quotmark: false
define([
  '../../bower_components/react/react'
], function (React) {
  'use strict';

  var Timer = React.createClass({displayName: 'Timer',
    getInitialState: function () {
      return {secondsElapsed: 0};
    },
    tick: function () {
      this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    },
    componentDidMount: function () {
      this.interval = setInterval(this.tick, 1000);
    },
    componentWillUnmount: function () {
      clearInterval(this.interval);
    },
    render: function () {
      return (
        React.createElement("div", null, "Seconds Elapsed: ", this.state.secondsElapsed)
      );
    }
  });

  return {
    render: function (mountNode) {
      React.render(React.createElement(Timer, null), mountNode);
    }
  };
});
