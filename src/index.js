import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./utils/scrollToTheTop";
import { Provider } from "react-redux";
import configStore from "./store/configureStore";

const store = configStore();

store.subscribe(() => {
  localStorage.setItem("rocket-english", JSON.stringify(store.getState()));
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
