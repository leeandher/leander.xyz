import { createStore, compose } from "redux";

import { makeRandomBoard } from "./helper";
import rootReducer from "./reducers/_root";

const defaultState = {
  config: {
    speed: 200,
    width: 35,
    height: 20,
    theme: "light"
  },
  game: {
    isPlaying: true,
    generation: 0
  }
};

// Generate a random board for the initial state and assign it
defaultState.board = makeRandomBoard(
  defaultState.config.height,
  defaultState.config.width
);

// Allow for the Redux DevTools to be used
const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

export default store;
