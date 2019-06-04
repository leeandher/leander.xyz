import React from "react";
import { render } from "react-dom";

import "./styles/css/index.css";
import "antd/dist/antd.css";

import App from "./components/App";

import { Provider } from "react-redux";
import store from "./store";

import * as serviceWorker from "./serviceWorker";

const Conway = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(<Conway />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
