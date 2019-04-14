/*
A reducer takes in two things:
  1. The action (info about what happened)
  2. A copy of the current state
*/

/*
function comments(state = [], action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      const newComment = { text: action.comment, user: action.author };
      const addCommentState = { ...state };
      addCommentState[action.postId].push(newComment);
      return addCommentState;
    case 'REMOVE_COMMENT':
      const removeCommentState = { ...state };
      removeCommentState[action.postId].splice(action.index, 1);
      return removeCommentState;
    default:
      return state;
  }
}
*/

function postComments(state = [], action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      //Add a comment to the nested state
      return [...state, { user: action.author, text: action.comment }];
    case 'REMOVE_COMMENT':
      const i = action.index;
      return [
        //everything before this post
        ...state.slice(0, i),
        //everything after this post
        ...state.slice(i + 1)
      ];
    default:
      return state;
  }
}

function comments(state = [], action) {
  if (typeof action.postId !== 'undefined') {
    return {
      ...state,
      //Offload the nested state to a subreducer
      [action.postId]: postComments(state[action.postId], action)
    };
  }
  return state;
}

export default comments;
