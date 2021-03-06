import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import "./styles.scss";
import Store from "./store";

const { store } = Store();

var rootElement = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);

// $(document).bind("DOMNodeRemoved", function(e) {
//     console.log("Removed: " + e.target.nodeName);
//   });
