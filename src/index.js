import React from "react";
import {render} from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
//import App from "./components/App";
import "./index.css";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import App from "./App";

//all reducers
import reducers from "./store/reducers";
const rootReducers = reducers;

const composeEnhancers =
  process.env.NODE_ENV === "development" //e sad radi i u mozzila
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
