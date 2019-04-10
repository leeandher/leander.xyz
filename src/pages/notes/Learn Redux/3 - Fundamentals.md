# Learn Redux

A quick place for notes about stuff that I pick up throughout the [Learn Redux](learnredux.com) course.

_These notes are written as I go through the course, and might have information that is wrong or outdated. Simply put, I'm still learning!_

---

## Joining Reducers

Something important to note about Redux is that you can't simply import all your reducers at once into your store. Your store requires one **root reducer**, and it's up to you to do that. Of course you could dodge this problem by making all your reducers in the same file, but this can lead to a disorganized file structure.

Thankfully, Redux includes a nifty helper function for joining your reducers:

```js
// ./reducers/index.js

import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

// Some reducers
import posts from "./posts"
import comments from "./comments"

const rootReducer = combineReducers({
  posts,
  comments,
  routing: routerReducer,
})

export default rootReducer
```

This guy will combine all your reducers into one which can be used as the root for your Redux store.

_Note:_ We've also added the `routing` reducer, which comes from `react-router-redux`. This is useful for directing our routing with information from the redux store, and it requires the exact reducer title to be **_routing_**, when being instantiated.

---

## Reducer Composition

One of the fundamental patterns of building Redux apps is the ability to offload work into **subreducers**. These are kind of like helper functions which don't take in the entire state for modification, but can instead operate on just a _slice_ that is passed to it.

Think about this; your store (or your global state) is an object. That object could have arrays, which contain objects, whose keys contain arrays, booleans and more objects and even just reading that was a little bit too hard. Trying to keep every piece of state the same in our _pure function_ reducer is difficult.

This can be simplified if we break up our operations into subreducers, using these guys to make modifications to smaller pieces of data. Take this for example:

```js
function postComments(state = [], action) {
  switch (action.type) {
    case "ADD_COMMENT":
      // Add a comment to the nested state
      return [...state, { user: action.author, text: action.comment }]
    case "REMOVE_COMMENT":
      const i = action.index
      return [
        // everything before this post
        ...state.slice(0, i),
        // everything after this post
        ...state.slice(i + 1),
      ]
    default:
      return state
  }
}

function comments(state = [], action) {
  if (typeof action.postId !== "undefined") {
    return {
      ...state,
      // Offload the nested state to a subreducer
      [action.postId]: postComments(state[action.postId], action),
    }
  }
  return state
}
```

With that code, we don't have to worry about ensuring all the data is returned in one step with some complicated nested logic, we get a logical, operational reducer!

---

## Providing Access

In order for your store to be effective, you need to `Provide` access to its data throughout your application. You can do this by invoking the `connect` function on the component of your choice! In some cases, it's best to create a sort of _wrapper_ component which will effectively _**prop-ify**_ your main component. In the following snippet, we create a `connect()` wrapper component called _App_ to replace _Main_.

```js
// App.js
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as actionCreators from "../actions/actionCreators"
import Main from "./Main"

const mapStateToProps = s => {
  return { posts: s.posts, comments: s.comments }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch)
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main)

export default App
```

Now we simply replace `Main` with `App` in our router, and we can access the global state via the `Main` component's props!

---

## Hot Reloading Redux Reducers (w/ Webpack)

Commonly with `create-react-app` applications, we'd like to set up our webpack to hot-reload on any change, but Redux reducers will usually through an error telling you that they require a hard reload. Instead, we can just modify our webpack build in order to let swap out our reducers whenever we should hot-reload them.

```js
// In ./store.js
if (module.hot) {
  module.hot.accept("./reducers/", () => {
    const newRootReducer = require("./reducers/index").default
    store.replaceReducer(newRootReducer)
  })
}
```

Effectively, this code is swapping the existing reducer with the new one (which has been modified on save), whenever webpack is not up-to-date, and would be hot-reloading.

---

## Using Enhancers

Redux is also capable of allowing for debugging via _time-travelling_ through the operation history. This is used most commonly via the Redux DevTools (browser extension). Unlike React, Redux DevTools don't simply hook up to the app by default, they have to be connected. To do so, we specify the enhancer and the store as follows:

```js
// Specify `compose`
import { createStore, compose } from "redux"

// Allow for the Redux DevTools to run on this app
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)

const store = createStore(rootReducer, defaultState, enhancers)
```

## Reducer Restrictions

Simply put, you cannot use asynchronous code in your reducers, they will NOT work! If there is ever a need to do so there are external libraries/packages which may help, namely [`redux-saga`](https://github.com/redux-saga/redux-saga) or [`redux-thunk`](https://github.com/reduxjs/redux-thunk). The author of Redux also made a helpful package for dealing with heavily nested JSON responses called [`normalizr`](https://github.com/paularmstrong/normalizr), so that could also be of assistance.

---
