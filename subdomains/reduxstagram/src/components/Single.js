import React from 'react';
import Photo from './Photo';
import Comments from './Comments';

//Import comments

const Single = (props) => {
  //Get the matching posted photo
  const { postId } = props.params;
  const i = props.posts.findIndex((post) => post.code === postId);
  const post = props.posts[i];

  //Get the matching comments
  const postComments = props.comments[postId] || [];

  return (
    <div className="single-photo">
      <Photo index={i} post={post} {...props} />
      <Comments postComments={postComments} {...props} />
    </div>
  );
};

export default Single;
