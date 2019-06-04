//Base imports
import { createStore, compose } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'

//Import the root reducer
import rootReducer from './reducers/index'

//Import the data
import comments from './data/comments'
import posts from './data/posts'

//Create an object for our default state;
const defaultState = { posts, comments }

//Allow for the Redux DevTools to run on this app
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(rootReducer, defaultState, enhancers)

export const history = syncHistoryWithStore(browserHistory, store)

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const newRootReducer = require('./reducers/index').default
    store.replaceReducer(newRootReducer)
  })
}

export default store
