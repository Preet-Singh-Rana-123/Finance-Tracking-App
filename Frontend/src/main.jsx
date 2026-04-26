import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./services/chartsSetup";
import { Provider } from "react-redux";
import store from "./services/store.jsx";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>,
);
