/*
A reducer takes in two things:
  1. The action (info about what happened)
  2. A copy of the current state
*/

function posts(state = [], action) {
  switch (action.type) {
    case 'INCREMENT_LIKES':
      const i = action.index;
      return [
        //everything before this post
        ...state.slice(0, i),
        //create a new object, spread the old one, change the likes
        { ...state[i], likes: state[i].likes + 1 },
        //everything after this post
        ...state.slice(i + 1)
      ];
    //Return the modified state!
    default:
      //Don't do anything!
      return state;
  }
}

export default posts;
