# Learn Redux

A quick place for notes about stuff that I pick up throughout the [Learn Redux](learnredux.com) course.

_These notes are written as I go through the course, and might have information that is wrong or outdated. Simply put, I'm still learning!_

---

## Pure Functions

Pure functions can be described as predictable functions. These are essential for Redux, as the basis of making changes to state. Instead of modifying the existing state, we take a copy, modify it, and return the new state back. This takes place in our reducers. While they seem scary, pure functions are actually relatively easy to understand. By _predictable_ what I mean is that, given the same input, the function always produces the same result. See the following:

```js
const testArr = [1, 2, 3, 4]

// Impure function!
function add3toSecond(arr) {
  arr[1] += 3
  return arr
}

add3toSecond(testArr) // [1, 5, 3, 4]
add3toSecond(testArr) // [1, 8, 3, 4]
add3toSecond(testArr) // [1, 11, 3, 4]
```

This is an example of an impure function. Given the exact same input, function returns a different value each time, because it is able to reach outside of its scope and modify another value (in this case, `testArr`). To create a pure function, we can do the following:

```js
const testArr = [1, 2, 3, 4]

// Pure function!
function add3toSecond(arr) {
  const newArr = [...arr]
  newArr[1] += 3
  return newArr
}

add3toSecond(testArr) // [1, 5, 3, 4]
add3toSecond(testArr) // [1, 5, 3, 4]
add3toSecond(testArr) // [1, 5, 3, 4]
```

No matter how many times the same input is used, the function always returns the same value! Pure functions are extremely useful for things like testing and better **functional programming** practices.

---

## Creating Actions

Now that we know what actions are, we can get more into how we make them, and designate what happens when we call them. Actions are actually very easy to make, since they are pretty much dummy functions which just return our new state object. All we have to do is create the name of the function, and pass in the info that we will be using when we modify our state. Take a look:

```js
export function addComment(postId, author, comment) {
  return {
    type: "ADD_COMMENT",
    postId,
    author,
    comment,
  }
}
```

This is how we designate an action. This action is called `addComment` and in order to call it, we need to pass in a `postId`, an `author`, and the `comment` itself. In exchange, we get an object with the `type` of `ADD_COMMENT` which will be accessed by our reducer in the next step.

In terms of organization. Depending on the complexity of your application, it might be best to create an `actions/` directory in which you store your actions by scope, i.e. `storeActionCreators`, `userActionCreators`, etc. If not complex, just create one file entitled `actionCreators` and export all the functions from there.

---

## Using Reducers

Reducers are the functions which actually perform the operation on our state. Taking what we know about pure functions, we try not to mutate our state, and instead take a copy whenever we perform any actions in the reducer. The most significant part about setting up a reducer is the `switch` statement.

When you set up the reducer, it is a function which takes in two parameters, the `state` (which is set default to `[]`), and the action. The switch statement is used for `action.type` in which we match the action to an operation based on the scope of the reducer. Take a look at the following:

```js
// ./reducers/posts.js

function posts(state = [], action) {
  switch (action.type) {
    case "INCREMENT_LIKES":
      const i = action.index
      return [
        // everything before this post
        ...state.slice(0, i),
        // create a new object, spread the old one, change the likes
        { ...state[i], likes: state[i].likes + 1 },
        // everything after this post
        ...state.slice(i + 1),
      ]
    // Return the modified state!
    default:
      // Don't do anything!
      return state
  }
}

export default posts
```

This is an example of a reducer which acts only one one action. We have a `switch` statement to catch the `action.type`, then it returns a state array that is a direct copy of the original state with a slight modification.

---

## Creating a Store

Creating the store in Redux is easy, as long as we have already created the _root reducer_. We should know by know that when it comes down to it, we always consolidate our reducers into one big one. Since every store needs a reducer, it just makes sense that we also only have one global state object, or _store_.

The actual process of making the store is just a few lines:

```js
// Import the root reducer
import rootReducer from "./reducers/index"

// Import the data
import comments from "./data/comments"
import posts from "./data/posts"

// Create an object for our default state;
const defaultState = { posts, comments }

const store = createStore(rootReducer, defaultState)

export default store
```

Just like that, we've created our store. Now we just pass it to the `Provider` and we can reach it from whichever component we like! If you are using `react-router` with Redux, you may also want to do the following:

```js
// In store.js
import { syncHistoryWithStore } from "react-router-redux"
import { browserHistory } from "react-router"

export const history = syncHistoryWithStore(browserHistory, store)
```

```js
// In CompleteApp.js
import store, { history } from './store';

const CompleteApp = () => (
  <Provider store={store}>
    <Router history={history}>
     <!--Routes-->
    </Router>
  </Provider>
);
```

---
