// import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "rc-slider/assets/index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import App from "./App";
import "./index.css";

import makeStore from "redux/store";

const store = makeStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
