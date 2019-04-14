import React from 'react';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderComment = this.renderComment.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { postId } = this.props.params;
    const author = this.refs.author.value;
    const comment = this.refs.comment.value;
    this.props.addComment(postId, author, comment);
    this.refs.commentForm.reset();
  }

  handleDelete(index) {
    const { postId } = this.props.params;
    this.props.removeComment(postId, index);
  }

  renderComment(comment, i) {
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{comment.user}</strong>
          {comment.text}
          <button
            className="remove-comment"
            onClick={() => this.handleDelete(i)}
          >
            &times;
          </button>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="comments">
        <div className="comment">
          {this.props.postComments.map(this.renderComment)}
          <form
            className="comment-form"
            ref="commentForm"
            onSubmit={this.handleSubmit}
          >
            <input type="text" ref="author" placeholder="author" required />
            <input type="text" ref="comment" placeholder="comment" required />
            <input type="submit" hidden />
          </form>
        </div>
      </div>
    );
  }
}

export default Comments;
