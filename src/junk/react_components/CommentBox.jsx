// jshint quotmark: false
// jshint nonbsp: false
define([
  'jquery',
  '../../bower_components/react/react',
  'showdown'
], function ($, React, Showdown) {
  'use strict';

  var converter = new Showdown.converter();
  //var data = [
  //  {author: "Pete Hunt", text: "This is one comment"},
  //  {author: "Jordan Walke", text: "This is *another* comment"}
  //];

  var Comment = React.createClass({
    render: function () {
      //console.log(this.props.children);
      var rawHtml = converter.makeHtml(this.props.children.toString());
      return (
        <div className="comment">
          <h2 className="commentAuthor">
          {this.props.author}
          </h2>
          <span dangerouslySetInnerHTML={{__html: rawHtml}} />
        </div>
      );
    }
  });

  var CommentList = React.createClass({
    render: function () {
      var commentNodes = this.props.data.map(function (comment) {
        return (
          <Comment author={comment.author}>
            {comment.text}
          </Comment>
        );
      });
      return (
        <div className="commentList">
        {commentNodes}
        </div>
      );
    }
  });

  var CommentForm = React.createClass({
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
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Your name" ref="author" />
          <input type="text" placeholder="Say something..." ref="text" />
          <input className="btn btn-small" type="submit" value="Post" />
        </form>
      );
    }
  });

  var CommentBox = React.createClass({
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
        <div className="commentBox">
          <h1>Comments</h1>
          <CommentList data={this.state.data} />
          <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        </div>
      );
    }
  });

  return {
    render: function (mountNode) {
      React.render(<CommentBox url="/data/comments.json" pollInterval={2000}/>, mountNode);
    }
  };
});
