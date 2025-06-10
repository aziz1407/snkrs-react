import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import "./css/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import ContextProvider from "./app/context/ContextProvider";
import ThemeModeProvider from "./app/context/ThemeModeContext"; 
import { SocketProvider } from "./app/context/SocketContext";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeModeProvider> 
        <ContextProvider>
          <SocketProvider>
          <Router>
            <App />
          </Router>
          </SocketProvider>
        </ContextProvider>
      </ThemeModeProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
