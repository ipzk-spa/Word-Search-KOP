import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CookieConsentBanner from "./components/legal/CookieConsentBanner.jsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <CookieConsentBanner />
    </BrowserRouter>
  </React.StrictMode>,
);
