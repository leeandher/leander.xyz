import { combineReducers } from "redux";

import board from "./board";
import game from "./game";
import config from "./config";

const rootReducer = combineReducers({
  board,
  game,
  config
});

export default rootReducer;
