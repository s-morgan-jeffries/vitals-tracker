// jshint quotmark: false
// jshint nonbsp: false
define([
  'jquery',
  'react',
  'showdown'
], function ($, React, Showdown) {
  'use strict';

  var converter = new Showdown.converter();
  //var data = [
  //  {author: "Pete Hunt", text: "This is one comment"},
  //  {author: "Jordan Walke", text: "This is *another* comment"}
  //];

  var Comment = React.createClass({displayName: 'Comment',
    render: function () {
      //console.log(this.props.children);
      var rawHtml = converter.makeHtml(this.props.children.toString());
      return (
        React.createElement("div", {className: "comment"}, 
          React.createElement("h2", {className: "commentAuthor"}, 
          this.props.author
          ), 
          React.createElement("span", {dangerouslySetInnerHTML: {__html: rawHtml}})
        )
      );
    }
  });

  var CommentList = React.createClass({displayName: 'CommentList',
    render: function () {
      var commentNodes = this.props.data.map(function (comment) {
        return (
          React.createElement(Comment, {author: comment.author}, 
            comment.text
          )
        );
      });
      return (
        React.createElement("div", {className: "commentList"}, 
        commentNodes
        )
      );
    }
  });

  var CommentForm = React.createClass({displayName: 'CommentForm',
    handleSubmit: function(e) {
      e.preventDefault();
      var author = this.refs.author.getDOMNode().value.trim();
      var text = this.refs.text.getDOMNode().value.trim();
      if (!text || !author) {
        return;
      }
      // TODO: send request to the server
      this.props.onCommentSubmit({author: author, text: text});
      this.refs.author.getDOMNode().value = '';
      this.refs.text.getDOMNode().value = '';
      return;
    },
    render: function () {
      return (
        React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
          React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}), 
          React.createElement("input", {type: "text", placeholder: "Say something...", ref: "text"}), 
          React.createElement("input", {className: "btn btn-small", type: "submit", value: "Post"})
        )
      );
    }
  });

  var CommentBox = React.createClass({displayName: 'CommentBox',
    getInitialState: function () {
      return {data: []};
    },
    loadCommentsFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    componentDidMount: function () {
      this.loadCommentsFromServer();
      this.commentLoader = setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    componentWillUnmount: function () {
      clearInterval(this.commentLoader);
    },
    //handleClick: function () {
    //  console.log('Clicked');
    //},
    handleCommentSubmit: function (comment) {
      console.log(comment);

      var comments = this.state.data;
      var newComments = comments.concat([comment]);
      this.setState({data: newComments});

      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    render: function () {
      return (
        React.createElement("div", {className: "commentBox"}, 
          React.createElement("h1", null, "Comments"), 
          React.createElement(CommentList, {data: this.state.data}), 
          React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
        )
      );
    }
  });

  return {
    render: function (mountNode) {
      React.render(React.createElement(CommentBox, {url: "/data/comments.json", pollInterval: 2000}), mountNode);
    }
  };
});
